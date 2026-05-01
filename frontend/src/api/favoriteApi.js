import apiClient from './client';

export const favoriteApi = {
  async getFavorites() {
    const { data } = await apiClient.get('/favorites');
    return data;
  },
  async addFavorite(payload) {
    const { data } = await apiClient.post('/favorites', payload);
    return data;
  },
  async removeFavorite(animeId) {
    const { data } = await apiClient.delete(`/favorites/${animeId}`);
    return data;
  },
  async checkFavorite(animeId) {
    const { data } = await apiClient.get(`/favorites/${animeId}/status`);
    return data;
  },
};
