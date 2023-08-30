import { API_BASE_URL, instance } from './axiosConfig';

instance.interceptors.response.use(
  response => response,
  error => {
    console.error(error);
    return Promise.reject({
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);

export const fetchPokemonEvolution = async url => {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
