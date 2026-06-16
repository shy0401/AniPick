const BLOCKED_TITLES = new Set([
  '\uD55C\uAD6D\uC5B4 \uC81C\uBAA9 \uC900\uBE44 \uC911',
  '\uC81C\uBAA9 \uC900\uBE44 \uC911',
  '\uC81C\uBAA9 \uBC88\uC5ED \uC900\uBE44 \uC911',
  'Untitled',
  '\u30BF\u30A4\u30C8\u30EB\u306A\u3057',
  '-',
]);

const HANGUL_RE = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const JAPANESE_RE = /[\u3040-\u30ff\u3400-\u9fff]/;
const LATIN_RE = /[A-Za-z]/;

function hasHangul(text) {
  return HANGUL_RE.test(String(text || ''));
}

function hasJapanese(text) {
  return JAPANESE_RE.test(String(text || ''));
}

function hasLatin(text) {
  return LATIN_RE.test(String(text || ''));
}

function getFallbackTitle(lang = 'ko') {
  if (lang === 'en') return 'Untitled';
  if (lang === 'ja') return '\u30BF\u30A4\u30C8\u30EB\u306A\u3057';
  return '\uC81C\uBAA9 \uBC88\uC5ED \uC900\uBE44 \uC911';
}

function normalizeArgs(langOrFallback = 'ko', fallbackArg) {
  const normalized = String(langOrFallback || '').toLowerCase();
  const isLang = ['ko', 'en', 'ja'].includes(normalized);
  if (isLang) {
    return {
      lang: normalized,
      fallback: fallbackArg || getFallbackTitle(normalized),
    };
  }

  return {
    lang: 'ko',
    fallback: langOrFallback || getFallbackTitle('ko'),
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

function onlyHangulTitle(value) {
  const text = String(value || '').trim();
  return hasHangul(text) ? text : null;
}

function onlyJapaneseTitle(value) {
  const text = String(value || '').trim();
  return hasJapanese(text) ? text : null;
}

function onlyLatinTitle(value) {
  const text = String(value || '').trim();
  return hasLatin(text) && !hasHangul(text) ? text : null;
}

export function getSafeAnimeTitle(anime, langOrFallback = 'ko', fallbackArg) {
  const { lang, fallback } = normalizeArgs(langOrFallback, fallbackArg);

  const koCandidates = [
    onlyHangulTitle(anime?.displayTitle),
    onlyHangulTitle(anime?.koreanTitle),
    onlyHangulTitle(anime?.animeTitleDisplay),
    onlyHangulTitle(anime?.translation?.title),
    onlyHangulTitle(anime?.title?.native),
    onlyHangulTitle(anime?.nativeTitle),
  ];

  const enCandidates = [
    onlyLatinTitle(anime?.translation?.title),
    onlyLatinTitle(anime?.title?.english),
    onlyLatinTitle(anime?.englishTitle),
    onlyLatinTitle(anime?.title?.romaji),
    onlyLatinTitle(anime?.romajiTitle),
    onlyLatinTitle(anime?.displayTitle),
    onlyLatinTitle(anime?.animeTitleDisplay),
  ];

  const jaCandidates = [
    onlyJapaneseTitle(anime?.translation?.title),
    onlyJapaneseTitle(anime?.title?.native),
    onlyJapaneseTitle(anime?.nativeTitle),
    onlyJapaneseTitle(anime?.displayTitle),
    onlyJapaneseTitle(anime?.animeTitleDisplay),
  ];

  const source = lang === 'ja' ? jaCandidates : lang === 'en' ? enCandidates : koCandidates;
  const selected = pickFirstMeaningful(source);

  if (selected) return selected;
  return String(fallback || getFallbackTitle(lang)).trim();
}

export { BLOCKED_TITLES, hasHangul };
