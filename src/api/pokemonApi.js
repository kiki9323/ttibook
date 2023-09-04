import { instance } from './axiosConfig';

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

export const fetchPokemonByRange = async (pageParam = 1, pageSize) => {
  const limitParams = {
    offset: (pageParam - 1) * pageSize,
    limit: pageSize,
  };

  try {
    const [pokeResponse, speciesResponse] = await Promise.all([
      instance.get(`/pokemon`, { params: limitParams }),
      instance.get(`/pokemon-species`, { params: limitParams }),
    ]);

    return {
      data: [pokeResponse.data.results, speciesResponse.data.results],
      nextPageNumber: pageParam + 1,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to "fetchPokemonByRange"');
  }
};

export const fetchPokemonTotalCount = async () => {
  const response = await instance.get(`/pokemon`);
  return response.data.count;
};

export const fetchDataFromUrls = async urls => {
  try {
    const responses = await Promise.all(urls.map(url => instance.get(url)));
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Failed to fetch data from URLs: ', error);
    return [];
  }
};

/**
 * API 호출 함수를 기능별로 분리하여 특정 작업만 수행하고, 서로 다른 엔드포인트에 대한 별도의 호출 함수를 사용한다.
 * => 나중에 추가적인 요청이나 기능별 구현에 대처하기 쉬워짐.
 * => 각각의 기능에 대해서만 처리하고 반환되는 데이터를 전달함으로써 기능별 구현에 유연함.
 * => 필요한 API 호출만 사용해 처리할 수 있으므로 불필요한 호출 최소화.
 * => 기능별 코드 간의 관심사 분리 구현
 */
