import { API_BASE_URL } from '../api/apiConfig';
import axios from 'axios';
import { fetchPokemonEvolution } from '../api/pokemonApi';
import { useQuery } from 'react-query';

const useGetEvolution = url => {
  const {
    data: evolutionData,
    isLoading,
    error,
    refetch,
  } = useQuery(['evolution', url], () => fetchPokemonEvolution(url), {
    enabled: !!url,
  });

  return {
    evolutionData,
    isLoading,
    error,
    refetch,
  };
};

export default useGetEvolution;
