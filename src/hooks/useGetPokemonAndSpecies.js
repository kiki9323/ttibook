import { API_BASE_URL } from '../api/apiConfig';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchById = async id => {
  const [pokemonResponse, speciesResponse] = await Promise.all([
    axios.get(`${API_BASE_URL}/pokemon/${id}`),
    axios.get(`${API_BASE_URL}/pokemon-species/${id}`),
  ]);

  return [pokemonResponse.data, speciesResponse.data];
};

export const usePokemonAndSpecies = id => {
  const {
    data: [pokemonData, speciesData] = [undefined, undefined],
    isLoading,
    error,
  } = useQuery(['pokemon_and_species', id], () => fetchById(id));

  return {
    pokemonData,
    speciesData,
    isLoading,
    error,
  };
};
