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

export const fetchPokemonList = async (page = 1, pageSize = 10) => {
  try {
    const response = await instance.get(`/pokemon`, {
      params: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPokemonById = async id => {
  try {
    const response = await instance.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPokemonSpeciesById = async id => {
  try {
    const response = await instance.get(`/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * API 호출 함수를 기능별로 분리하여 특정 작업만 수행하고, 서로 다른 엔드포인트에 대한 별도의 호출 함수를 사용한다.
 * => 나중에 추가적인 요청이나 기능별 구현에 대처하기 쉬워짐.
 * => 각각의 기능에 대해서만 처리하고 반환되는 데이터를 전달함으로써 기능별 구현에 유연함.
 * => 필요한 API 호출만 사용해 처리할 수 있으므로 불필요한 호출 최소화.
 * => 기능별 코드 간의 관심사 분리 구현
 */
