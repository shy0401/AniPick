import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('anipick_lang') || 'ko';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-AniPick-Lang'] = lang;

  const method = String(config.method || 'get').toLowerCase();
  if (method === 'get') {
    config.params = {
      ...(config.params || {}),
      lang,
    };
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('anipick:unauthorized'));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
