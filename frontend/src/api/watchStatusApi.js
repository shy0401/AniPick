import apiClient from './client';

export const watchStatusApi = {
  async getMyWatchStatus() {
    const { data } = await apiClient.get('/watch-status');
    return data;
  },
  async upsertWatchStatus(payload) {
    const { data } = await apiClient.put('/watch-status', payload);
    return data;
  },
  async removeWatchStatus(animeId) {
    const { data } = await apiClient.delete(`/watch-status/${animeId}`);
    return data;
  },
};
