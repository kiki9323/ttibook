import axios from 'axios';

export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const instance = axios.create({
  // Default API endpoint
  baseURL: API_BASE_URL,

  // Proxy
  proxy: {
    protocol: 'http',
    host: 'localhost',
    port: 3000,
  },
});
