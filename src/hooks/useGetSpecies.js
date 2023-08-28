import { fetchPokemonSpeciesById } from '../api/pokemonApi';
import { useQuery } from 'react-query';

const useGetSpecies = id => {
  const {
    data: speciesData,
    isLoading,
    isError,
    error,
  } = useQuery(['pokemon-species', id], () => fetchPokemonSpeciesById(id));

  return {
    speciesData,
    isLoading,
    isError,
    error,
  };
};

export default useGetSpecies;
