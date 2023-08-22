import { fetchPokemonSpeciesById } from '../api/pokemonApi';
import { useQuery } from 'react-query';

const useGetSpecies = id => {
  const { data: speciesData, isLoading, error } = useQuery(['pokemon-species', id], () => fetchPokemonSpeciesById(id));

  return {
    speciesData,
    isLoading,
    error,
  };
};

export default useGetSpecies;
