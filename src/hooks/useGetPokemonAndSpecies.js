import { instance } from '../api/axiosConfig';
import { useQuery } from 'react-query';

const fetchById = async id => {
  const [pokemonResponse, speciesResponse] = await Promise.all([
    instance.get(`/pokemon/${id}`),
    instance.get(`/pokemon-species/${id}`),
  ]);

  return [pokemonResponse.data, speciesResponse.data];
};

const usePokemonAndSpecies = id => {
  const {
    data: [pokemonData, speciesData] = [undefined, undefined],
    isLoading,
    isError,
    error,
  } = useQuery(['pokemon_and_species', id], async () => fetchById(id), {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    pokemonData,
    speciesData,
    isLoading,
    isError,
    error,
  };
};

export default usePokemonAndSpecies;
