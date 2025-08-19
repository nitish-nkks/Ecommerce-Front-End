import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://abc-api-qa.abisaio.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;