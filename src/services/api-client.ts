import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1',
  params: {
    apikey: import.meta.env.VITE_GAMESDB_API_KEY,
  },
});

export default apiClient;