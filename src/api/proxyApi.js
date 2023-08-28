import { API_BASE_URL, instance } from './axiosConfig';

instance.interceptors.response.use(
  response => response,
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export const fetchPokemonEvolution = async url => {
  try {
    const response = await instance.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
