import { fetchPokemonById } from '../api/pokemonApi';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const useGetPokemon = id => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['pokemon', id],
    () => fetchPokemonById(id),
    {
      enabled: !!id, // id가 존재할 경우에만 쿼리 활성화
    },
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetPokemon;

/**
 * 캐싱한 데이터를 가져와서 쓰고 싶었는데,
 * isLoading,error 같은 것들은 getQueriesData() 혹은 getQueryData()을 사용할 경우 쓸 수 없다.
 */
// import queryClient from '../api/queryClient';

// const useGetPokemon = id => {
//   const allQueriesData = queryClient.getQueriesData(`pokemon-${id}`);
//   const existData = allQueriesData.find(item =>
//     item[0].includes(`pokemon-${id}`),
//   );
//   const pokemonData = existData?.[1];

//   // const isLoading = Boolean(
//   //   queryClient.getQueryStatus(`pokemon-${id}`) === 'loading',
//   // );
//   // const error = queryClient.getQueryState(`pokemon-${id}`).error;

//   return {
//     data: pokemonData,
//     // isLoading,
//     // error,
//   };
// };

// export default useGetPokemon;
