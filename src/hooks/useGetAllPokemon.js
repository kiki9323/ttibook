import { fetchPokemonByRange } from '@/api/pokemonApi';
import { useQuery } from 'react-query';

const useGetAllPokemon = (pageSize = 100) => {
  const { data: [resultPoke, resultSpecies] = [[], []], status } = useQuery(
    ['allPokemon'],
    async () => fetchPokemonByRange(1, pageSize),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  return {
    data: [resultPoke, resultSpecies],
    status,
  };
};
export default useGetAllPokemon;
