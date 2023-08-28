import { fetchPokemonEvolution } from '../api/proxyApi';
import { useQuery } from 'react-query';

const useGetEvolution = url => {
  const {
    data: evolutionData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(['evolution', url], () => fetchPokemonEvolution(url), {
    enabled: !!url,
  });

  return {
    evolutionData,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetEvolution;
