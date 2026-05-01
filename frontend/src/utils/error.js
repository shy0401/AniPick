const FALLBACK_MESSAGE = '외부 애니메이션 데이터 서버가 불안정하여 임시 데이터를 표시합니다.';
const RETRY_MESSAGE = '잠시 후 다시 시도하거나 검색 조건을 변경해 주세요.';

export function toUserErrorMessage(error, fallback = `${FALLBACK_MESSAGE} ${RETRY_MESSAGE}`) {
  const raw = error?.response?.data?.message || error?.message || '';
  const text = String(raw);

  if (
    text.includes('AniList GraphQL request failed') ||
    text.includes('AxiosError') ||
    text.includes('provider failed') ||
    text.includes('403') ||
    text.includes('AniList')
  ) {
    return fallback;
  }

  return text || fallback;
}

export { FALLBACK_MESSAGE, RETRY_MESSAGE };
