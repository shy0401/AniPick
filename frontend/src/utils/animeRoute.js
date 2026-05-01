export function getAnimeRouteId(anime) {
  const candidates = [
    anime?.routeId,
    anime?.externalId,
    anime?.malId,
    anime?.animeExternalId,
    anime?.animeIdExternal,
    anime?.sourcePayload?.mal_id,
  ];

  for (const value of candidates) {
    const id = Number(value);
    if (Number.isInteger(id) && id > 0) return id;
  }

  return null;
}

export function normalizeAnimeRouteFields(anime) {
  if (!anime || typeof anime !== 'object') {
    return anime;
  }

  const routeId = getAnimeRouteId(anime);

  return {
    ...anime,
    routeId,
    externalId: anime.externalId ?? routeId,
    malId: anime.malId ?? routeId,
  };
}
