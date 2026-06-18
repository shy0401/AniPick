require('dotenv').config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const DATA_DIR = process.env.NAS_DATA_DIR || path.resolve(__dirname, '../../runtime');
const STORE_FILE = path.join(DATA_DIR, 'nas-store.json');
const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
const ANILIST_BASE_URL = 'https://graphql.anilist.co';
const APPLY = process.argv.includes('--apply');
const LIMIT = Number(process.argv.find((arg) => arg.startsWith('--limit='))?.split('=')[1] || 0);
const SLEEP_MS = Number(process.argv.find((arg) => arg.startsWith('--sleep='))?.split('=')[1] || 900);

const BLOCKED_TERMS = ['hentai', 'erotica', 'rx - hentai'];
const KNOWN_ANILIST_ID_BY_TITLE = {
  'yosuga no sora': 8861,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isFilled(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

function numberOrNull(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[`'".:;!?()[\]{}]/g, ' ')
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleTokens(value) {
  return normalizeText(value)
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function getImageUrl(raw) {
  return (
    raw?.images?.jpg?.large_image_url ||
    raw?.images?.webp?.large_image_url ||
    raw?.images?.jpg?.image_url ||
    raw?.images?.webp?.image_url ||
    null
  );
}

function isAdultRaw(raw) {
  const text = [
    raw?.title,
    raw?.title_english,
    raw?.title_japanese,
    raw?.rating,
    ...(raw?.genres || []).map((genre) => genre?.name),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return BLOCKED_TERMS.some((term) => text.includes(term));
}

function isAdultAniList(raw) {
  return Boolean(raw?.isAdult);
}

function getCandidateTitles(anime) {
  return [
    anime?.romajiTitle,
    anime?.englishTitle,
    anime?.nativeTitle,
    anime?.displayTitle,
    anime?.sourcePayload?.title,
    anime?.sourcePayload?.title_english,
    anime?.sourcePayload?.title_japanese,
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean)
    .filter((value, index, array) => array.findIndex((item) => normalizeText(item) === normalizeText(value)) === index);
}

function scoreTitleMatch(raw, currentTitles) {
  const rawTitles = [
    raw?.title,
    raw?.title_english,
    raw?.title_japanese,
    raw?.title?.romaji,
    raw?.title?.english,
    raw?.title?.native,
    ...(Array.isArray(raw?.titles) ? raw.titles.map((item) => item?.title) : []),
  ].filter(Boolean);

  let best = 0;
  for (const wanted of currentTitles) {
    const normalizedWanted = normalizeText(wanted);
    if (!normalizedWanted) continue;
    const wantedTokens = titleTokens(wanted);

    for (const rawTitle of rawTitles) {
      const normalizedRaw = normalizeText(rawTitle);
      if (!normalizedRaw) continue;

      if (normalizedRaw === normalizedWanted) best = Math.max(best, 1);
      if (normalizedRaw.includes(normalizedWanted) || normalizedWanted.includes(normalizedRaw)) {
        best = Math.max(best, 0.88);
      }

      const rawTokens = new Set(titleTokens(rawTitle));
      if (wantedTokens.length > 0 && rawTokens.size > 0) {
        const overlap = wantedTokens.filter((token) => rawTokens.has(token)).length;
        best = Math.max(best, overlap / Math.max(wantedTokens.length, rawTokens.size));
      }
    }
  }

  return best;
}

async function fetchJikan(pathname, params = {}) {
  const { data } = await axios.get(`${JIKAN_BASE_URL}${pathname}`, {
    params,
    timeout: 15000,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'AniPick NAS image repair',
    },
  });
  return data;
}

async function fetchDetail(id) {
  try {
    const data = await fetchJikan(`/anime/${id}/full`);
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

async function searchByTitle(title) {
  if (!title) return [];
  try {
    const data = await fetchJikan('/anime', {
      q: title,
      sfw: true,
      limit: 8,
      order_by: 'popularity',
      sort: 'asc',
    });
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

async function searchAniListByTitle(title) {
  if (!title) return [];

  const query = `
    query SearchAnime($search: String) {
      Page(page: 1, perPage: 8) {
        media(search: $search, type: ANIME, isAdult: false) {
          id
          idMal
          title {
            romaji
            english
            native
          }
          description(asHtml: false)
          coverImage {
            extraLarge
            large
            medium
          }
          bannerImage
          siteUrl
          averageScore
          popularity
          episodes
          status
          season
          seasonYear
          format
          genres
          isAdult
        }
      }
    }
  `;

  try {
    const { data } = await axios.post(
      ANILIST_BASE_URL,
      { query, variables: { search: title } },
      {
        timeout: 15000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'AniPick NAS image repair',
        },
      }
    );
    return data?.data?.Page?.media || [];
  } catch (error) {
    return [];
  }
}

async function fetchAniListById(id) {
  if (!id) return null;

  const query = `
    query AnimeById($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        idMal
        title {
          romaji
          english
          native
        }
        description(asHtml: false)
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
        siteUrl
        averageScore
        popularity
        episodes
        status
        season
        seasonYear
        format
        genres
        isAdult
      }
    }
  `;

  try {
    const { data } = await axios.post(
      ANILIST_BASE_URL,
      { query, variables: { id } },
      {
        timeout: 15000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'AniPick NAS image repair',
        },
      }
    );
    return data?.data?.Media || null;
  } catch (error) {
    return null;
  }
}

function pickBestSearchResult(results, currentTitles) {
  return results
    .filter((item) => getImageUrl(item))
    .filter((item) => !isAdultRaw(item))
    .map((item) => ({ item, score: scoreTitleMatch(item, currentTitles) }))
    .sort((a, b) => b.score - a.score || Number(a.item.popularity || 999999) - Number(b.item.popularity || 999999))[0] || null;
}

function pickBestAniListResult(results, currentTitles) {
  return results
    .filter((item) => item?.coverImage?.extraLarge || item?.coverImage?.large || item?.coverImage?.medium)
    .filter((item) => !isAdultAniList(item))
    .map((item) => ({ item, score: scoreTitleMatch(item, currentTitles) }))
    .sort((a, b) => b.score - a.score || Number(b.item.popularity || 0) - Number(a.item.popularity || 0))[0] || null;
}

function normalizeJikanRaw(raw, current) {
  const imageUrl = getImageUrl(raw);
  if (!imageUrl) return null;

  return {
    imageUrl,
    bannerUrl: raw?.trailer?.images?.maximum_image_url || imageUrl,
    siteUrl: raw?.url || current.siteUrl || null,
    description: isFilled(current.description) ? current.description : raw?.synopsis || raw?.background || '',
    averageScore: raw?.score ? Math.round(Number(raw.score) * 10) : current.averageScore ?? null,
    popularity: raw?.popularity || current.popularity || null,
    scoredBy: raw?.scored_by || current.scoredBy || null,
    rank: raw?.rank || current.rank || null,
    members: raw?.members || current.members || null,
    favorites: raw?.favorites || current.favorites || null,
    episodes: raw?.episodes || current.episodes || null,
    status: current.status || raw?.status || null,
    season: current.season || raw?.season || null,
    seasonYear: current.seasonYear || raw?.year || null,
    format: current.format || raw?.type || null,
    genres:
      Array.isArray(current.genres) && current.genres.length > 0
        ? current.genres
        : (raw?.genres || []).map((genre) => genre?.name).filter(Boolean),
    sourcePayload: {
      ...(current.sourcePayload || {}),
      resolved_mal_id: raw?.mal_id || null,
      resolved_title: raw?.title || null,
      resolved_title_english: raw?.title_english || null,
      resolved_title_japanese: raw?.title_japanese || null,
      resolved_url: raw?.url || null,
      resolved_image_url: imageUrl,
      repaired_image_at: new Date().toISOString(),
    },
  };
}

function normalizeAniListRaw(raw, current) {
  const imageUrl = raw?.coverImage?.extraLarge || raw?.coverImage?.large || raw?.coverImage?.medium || null;
  if (!imageUrl) return null;

  return {
    imageUrl,
    bannerUrl: raw?.bannerImage || imageUrl,
    siteUrl: current.siteUrl || raw?.siteUrl || null,
    description: isFilled(current.description) ? current.description : raw?.description || '',
    averageScore: raw?.averageScore || current.averageScore || null,
    popularity: raw?.popularity || current.popularity || null,
    episodes: raw?.episodes || current.episodes || null,
    status: current.status || raw?.status || null,
    season: current.season || raw?.season || null,
    seasonYear: current.seasonYear || raw?.seasonYear || null,
    format: current.format || raw?.format || null,
    genres:
      Array.isArray(current.genres) && current.genres.length > 0
        ? current.genres
        : (raw?.genres || []).filter(Boolean),
    sourcePayload: {
      ...(current.sourcePayload || {}),
      anilist_id: raw?.id || null,
      resolved_mal_id: raw?.idMal || current.sourcePayload?.resolved_mal_id || null,
      resolved_title: raw?.title?.romaji || null,
      resolved_title_english: raw?.title?.english || null,
      resolved_title_japanese: raw?.title?.native || null,
      resolved_url: raw?.siteUrl || null,
      resolved_image_url: imageUrl,
      repaired_image_source: 'ANILIST',
      resolved_is_adult: Boolean(raw?.isAdult),
      repaired_image_at: new Date().toISOString(),
    },
  };
}

function mergeRepair(current, patch) {
  return {
    ...current,
    ...patch,
    romajiTitle: current.romajiTitle,
    englishTitle: current.englishTitle,
    nativeTitle: current.nativeTitle,
    cachedAt: new Date().toISOString(),
  };
}

async function resolveImagePatch(anime) {
  const externalId = numberOrNull(anime.externalId || anime.malId || anime.id);
  const currentTitles = getCandidateTitles(anime);
  if (currentTitles.length === 0) return { status: 'skipped', reason: 'missing_title' };

  for (const title of currentTitles) {
    const knownAniListId = KNOWN_ANILIST_ID_BY_TITLE[normalizeText(title)];
    if (!knownAniListId) continue;

    const known = await fetchAniListById(knownAniListId);
    if (known?.coverImage && scoreTitleMatch(known, currentTitles) >= 0.8) {
      return {
        status: 'resolved',
        method: 'anilist-known-id',
        score: 1,
        query: title,
        malId: known.idMal || null,
        hideAdult: Boolean(known.isAdult || (known.genres || []).some((genre) => normalizeText(genre) === 'ecchi')),
        patch: normalizeAniListRaw(known, anime),
      };
    }
  }

  if (externalId) {
    const detail = await fetchDetail(externalId);
    if (detail && getImageUrl(detail) && !isAdultRaw(detail)) {
      const score = scoreTitleMatch(detail, currentTitles);
      if (score >= 0.58) {
        return {
          status: 'resolved',
          method: 'detail',
          score,
          malId: detail.mal_id,
          patch: normalizeJikanRaw(detail, anime),
        };
      }
    }
  }

  for (const title of currentTitles.slice(0, 4)) {
    const results = await searchByTitle(title);
    const best = pickBestSearchResult(results, currentTitles);
    if (best && best.score >= 0.5) {
      return {
        status: 'resolved',
        method: 'search',
        score: best.score,
        query: title,
        malId: best.item.mal_id,
        patch: normalizeJikanRaw(best.item, anime),
      };
    }

    const aniListResults = await searchAniListByTitle(title);
    const bestAniList = pickBestAniListResult(aniListResults, currentTitles);
    if (bestAniList && bestAniList.score >= 0.45) {
      return {
        status: 'resolved',
        method: 'anilist-search',
        score: bestAniList.score,
        query: title,
        malId: bestAniList.item.idMal || null,
        patch: normalizeAniListRaw(bestAniList.item, anime),
      };
    }
    await sleep(SLEEP_MS);
  }

  return { status: 'failed', reason: 'no_matching_image' };
}

function readStore() {
  if (!fs.existsSync(STORE_FILE)) {
    throw new Error(`Store file not found: ${STORE_FILE}`);
  }
  return JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
}

function writeStore(store) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

async function main() {
  const store = readStore();
  const cache = Array.isArray(store.animeCache) ? store.animeCache : [];
  const missing = cache.filter((anime) => !isFilled(anime.imageUrl));
  const targets = LIMIT > 0 ? missing.slice(0, LIMIT) : missing;
  const summary = {
    store: STORE_FILE,
    mode: APPLY ? 'apply' : 'dry-run',
    totalAnime: cache.length,
    missingImageBefore: missing.length,
    targetCount: targets.length,
    resolved: 0,
    failed: 0,
    skipped: 0,
    updates: [],
  };

  for (const anime of targets) {
    const id = anime.externalId || anime.malId || anime.id;
    const titles = getCandidateTitles(anime);
    console.log(`[REPAIR] resolving ${id}: ${titles[0] || 'Untitled'}`);

    const result = await resolveImagePatch(anime);
    if (result.status !== 'resolved' || !result.patch) {
      summary[result.status === 'skipped' ? 'skipped' : 'failed'] += 1;
      summary.updates.push({ externalId: id, title: titles[0] || null, status: result.status, reason: result.reason });
      await sleep(SLEEP_MS);
      continue;
    }

    summary.resolved += 1;
    summary.updates.push({
      externalId: id,
      title: titles[0] || null,
      status: 'resolved',
      method: result.method,
      score: Number(result.score.toFixed(2)),
      resolvedMalId: result.malId,
      hidden: Boolean(result.hideAdult),
      imageUrl: result.patch.imageUrl,
    });

    if (APPLY) {
      const index = cache.findIndex((item) => Number(item.externalId || item.malId || item.id) === Number(id));
      if (index >= 0) {
        cache[index] = mergeRepair(cache[index], result.patch);
      }

      if (result.hideAdult) {
        store.hiddenAnime = Array.isArray(store.hiddenAnime) ? store.hiddenAnime : [];
        if (!store.hiddenAnime.map(String).includes(String(id))) {
          store.hiddenAnime.push(String(id));
        }
      }
    }

    await sleep(SLEEP_MS);
  }

  if (APPLY) {
    store.animeCache = cache;
    writeStore(store);
  }

  const missingAfter = cache.filter((anime) => !isFilled(anime.imageUrl)).length;
  summary.missingImageAfter = APPLY ? missingAfter : missing.length;
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error('[REPAIR] failed:', error);
  process.exitCode = 1;
});
