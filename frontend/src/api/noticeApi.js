import apiClient from './client';

export const noticeApi = {
  async getNotices() {
    const { data } = await apiClient.get('/notices');
    return data;
  },
  async createNotice(payload) {
    const { data } = await apiClient.post('/notices', payload);
    return data;
  },
  async deleteNotice(id) {
    const { data } = await apiClient.delete(`/notices/${id}`);
    return data;
  },
};
