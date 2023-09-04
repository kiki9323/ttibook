/**
 * useInfiniteQuery 사용 시
 * -> useQuery 훅의 반환값과 구성이 다르다.
 */
import { fetchPokemonByRange } from '@/api/pokemonApi';
import { useInfiniteQuery } from 'react-query';

const useGetAllPokemon = pageSize => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['allPokemon'],
    ({ pageParam }) => fetchPokemonByRange(pageParam, pageSize),
    {
      getNextPageParam: lastPage => lastPage.nextPageNumber,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  return {
    data,
    status,
    fetchNextPage,
    hasNextPage,
  };
};
export default useGetAllPokemon;

/**
 * useQuery 사용 시
 */
// import { fetchPokemonByRange } from '@/api/pokemonApi';
// import { useQuery } from 'react-query';
// const useGetAllPokemon = (pageSize = 100) => {
//   const { data: [resultPoke, resultSpecies] = [[], []], status } = useQuery(
//     ['allPokemon'],
//     async () => fetchPokemonByRange(1, pageSize),
//     {
//       keepPreviousData: true,
//       refetchOnWindowFocus: false,
//     },
//   );
//   return {
//     data: [resultPoke, resultSpecies],
//     status,
//   };
// };
// export default useGetAllPokemon;
