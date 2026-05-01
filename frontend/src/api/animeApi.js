import apiClient from './client';

function normalizeAnimeListResponse(data) {
  if (Array.isArray(data)) {
    return {
      items: data,
      pageInfo: {
        currentPage: 1,
        perPage: data.length,
        total: data.length,
        lastPage: 1,
        hasNextPage: false,
      },
      isFallback: false,
      message: '',
    };
  }

  const items = Array.isArray(data?.items) ? data.items : [];
  return {
    ...data,
    items,
    pageInfo:
      data?.pageInfo || {
        currentPage: 1,
        perPage: items.length,
        total: items.length,
        lastPage: 1,
        hasNextPage: false,
      },
    isFallback: Boolean(data?.isFallback),
    message: data?.message || '',
  };
}

export const animeApi = {
  async getTrending(params = {}) {
    const { data } = await apiClient.get('/anime/trending', { params });
    return Array.isArray(data) ? data : normalizeAnimeListResponse(data).items;
  },
  async getPopularSeason(params = {}) {
    const { data } = await apiClient.get('/anime/popular-season', { params });
    return normalizeAnimeListResponse(data);
  },
  async searchAnime(params = {}) {
    const { data } = await apiClient.get('/anime/search', { params });
    return normalizeAnimeListResponse(data);
  },
  async getAnimeDetail(id) {
    const { data } = await apiClient.get(`/anime/${id}`);
    return data;
  },
  async getRecommendations(params = {}) {
    const { data } = await apiClient.get('/anime/recommendations', { params });
    return data;
  },
};
