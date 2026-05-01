const BLOCKED_TITLES = new Set(['한국어 제목 준비 중', '제목 준비 중', 'Untitled', 'タイトルなし', '-']);

function hasHangul(text) {
  return /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(String(text || ''));
}

function normalizeArgs(langOrFallback = 'ko', fallbackArg = '제목 없음') {
  const isLang = ['ko', 'en', 'ja'].includes(String(langOrFallback || '').toLowerCase());
  if (isLang) {
    return {
      lang: String(langOrFallback).toLowerCase(),
      fallback: fallbackArg || '제목 없음',
    };
  }

  return {
    lang: 'ko',
    fallback: langOrFallback || '제목 없음',
  };
}

function pickFirstMeaningful(candidates) {
  for (const value of candidates) {
    const text = String(value || '').trim();
    if (!text) continue;
    if (BLOCKED_TITLES.has(text)) continue;
    return text;
  }
  return '';
}

export function getSafeAnimeTitle(anime, langOrFallback = 'ko', fallbackArg = '제목 없음') {
  const { lang, fallback } = normalizeArgs(langOrFallback, fallbackArg);

  const koCandidates = [
    anime?.displayTitle,
    anime?.koreanTitle,
    anime?.animeTitleDisplay,
    anime?.title?.english,
    anime?.title?.romaji,
    anime?.englishTitle,
    anime?.romajiTitle,
    hasHangul(anime?.title?.native) ? anime?.title?.native : null,
    hasHangul(anime?.nativeTitle) ? anime?.nativeTitle : null,
  ];

  const enCandidates = [
    anime?.displayTitle,
    anime?.animeTitleDisplay,
    anime?.title?.english,
    anime?.title?.romaji,
    anime?.title?.native,
    anime?.englishTitle,
    anime?.romajiTitle,
    anime?.nativeTitle,
  ];

  const jaCandidates = [
    anime?.displayTitle,
    anime?.animeTitleDisplay,
    anime?.title?.native,
    anime?.nativeTitle,
    anime?.title?.romaji,
    anime?.title?.english,
    anime?.romajiTitle,
    anime?.englishTitle,
  ];

  const commonTail = [anime?.animeTitle];

  const source = lang === 'ja' ? jaCandidates : lang === 'en' ? enCandidates : koCandidates;
  const selected = pickFirstMeaningful([...source, ...commonTail]);

  if (selected) return selected;
  return String(fallback || '제목 없음').trim() || '제목 없음';
}

export { BLOCKED_TITLES };
