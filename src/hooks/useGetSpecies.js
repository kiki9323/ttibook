import { fetchPokemonSpeciesById } from '../api/pokemonApi';
import { useQuery } from 'react-query';

const useGetSpecies = id => {
  const {
    data: speciesData,
    isLoading,
    isError,
    error,
  } = useQuery(['pokemon-species', id], () => fetchPokemonSpeciesById(id), {
    enabled: !!id, // id가 존재할 경우에만 쿼리 활성화
  });

  return {
    speciesData,
    isLoading,
    isError,
    error,
  };
};

export default useGetSpecies;
