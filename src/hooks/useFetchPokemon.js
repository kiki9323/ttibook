import { fetchPokemonById } from '../api/pokemonApi';
import { useQuery } from 'react-query';

const useFetchPokemon = (id, enabled = false) => {
  const { data, isLoading, error, refetch } = useQuery(
    `pokemon-${id}`,
    () => fetchPokemonById(id),
    { enabled },
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useFetchPokemon;
