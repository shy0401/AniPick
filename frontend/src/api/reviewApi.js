import apiClient from './client';

export const reviewApi = {
  async getReviewsByAnime(animeId) {
    const { data } = await apiClient.get(`/reviews/anime/${animeId}`);
    return data;
  },
  async getMyReviews() {
    const { data } = await apiClient.get('/reviews/me');
    return data;
  },
  async createReview(payload) {
    const { data } = await apiClient.post('/reviews', payload);
    return data;
  },
  async updateReview(id, payload) {
    const { data } = await apiClient.put(`/reviews/${id}`, payload);
    return data;
  },
  async deleteReview(id) {
    const { data } = await apiClient.delete(`/reviews/${id}`);
    return data;
  },
};
