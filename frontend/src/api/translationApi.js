import apiClient from './client';

export const translationApi = {
  async getOpenAIModels() {
    const { data } = await apiClient.get('/admin/translations/openai/models');
    return data;
  },
  async getCoverage() {
    const { data } = await apiClient.get('/admin/translations/coverage');
    return data;
  },
  async getMissingTranslations(params = {}) {
    const { data } = await apiClient.get('/admin/translations/missing', { params });
    return data;
  },
  async createJobs(payload) {
    const { data } = await apiClient.post('/admin/translations/jobs', payload);
    return data;
  },
  async runJobs(payload) {
    const { data } = await apiClient.post('/admin/translations/jobs/run', payload);
    return data;
  },
  async getTranslations(provider, externalId) {
    const { data } = await apiClient.get(`/translations/${provider}/${externalId}`);
    return data;
  },
  async upsertTranslation(provider, externalId, payload) {
    const { data } = await apiClient.put(`/admin/translations/${provider}/${externalId}`, payload);
    return data;
  },
  async autoTranslate(provider, externalId, payload) {
    const { data } = await apiClient.post(`/translations/${provider}/${externalId}/auto`, payload);
    return data;
  },
  async reviewTranslation(provider, externalId, payload) {
    const { data } = await apiClient.post(`/admin/translations/${provider}/${externalId}/review`, payload);
    return data;
  },
  async retryTranslation(provider, externalId, payload) {
    const { data } = await apiClient.post(`/admin/translations/${provider}/${externalId}/retry`, payload);
    return data;
  },
  async deleteTranslation(provider, externalId, lang) {
    const { data } = await apiClient.delete(`/translations/${provider}/${externalId}/${lang}`);
    return data;
  },
};
