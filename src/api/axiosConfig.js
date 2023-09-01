import axios from 'axios';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const instance = axios.create({
  // Default API endpoint
  // baseURL: API_BASE_URL,
  baseURL: import.meta.env.VITE_API_BASE_URL || API_BASE_URL,

  // 네트워크 문제 or 서버 응답 없는 경우 대비하여 설정
  timeout: 10000,

  // Proxy
  proxy: {
    protocol: import.meta.env.VITE_PROXY_PROTOCOL || 'http',
    host: import.meta.env.VITE_PROXY_HOST || 'localhost',
    port: import.meta.env.VITE_PROXY_PORT || 3000,
  },
});
