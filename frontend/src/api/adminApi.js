import apiClient from './client';

export const adminApi = {
  async getUsers() {
    const { data } = await apiClient.get('/admin/users');
    return data;
  },
  async getAllReviews() {
    const { data } = await apiClient.get('/admin/reviews');
    return data;
  },
  async deleteReview(id) {
    const { data } = await apiClient.delete(`/admin/reviews/${id}`);
    return data;
  },
  async getAnime(params = {}) {
    const { data } = await apiClient.get('/admin/anime', { params });
    return data;
  },
  async getAnimeById(id) {
    const { data } = await apiClient.get(`/admin/anime/${id}`);
    return data;
  },
  async hideAnime(id, reason) {
    const { data } = await apiClient.patch(`/admin/anime/${id}/hide`, { reason });
    return data;
  },
  async unhideAnime(id) {
    const { data } = await apiClient.patch(`/admin/anime/${id}/unhide`);
    return data;
  },
  async markAnimeAdult(id) {
    const { data } = await apiClient.patch(`/admin/anime/${id}/mark-adult`);
    return data;
  },
  async archiveAnime(id) {
    const { data } = await apiClient.delete(`/admin/anime/${id}`);
    return data;
  },
};
