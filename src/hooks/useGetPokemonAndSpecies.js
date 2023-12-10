import { instance } from '../api/axiosConfig';
import { langFilterAndAccessor } from '../utils/utils';
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

  const { stats, height, weight, abilities, name, sprites, types } = pokemonData || {};
  const { flavor_text_entries, capture_rate, habitat, names, genera, color, is_legendary, is_mythical } =
    speciesData || {};

  const koName = langFilterAndAccessor(names, 'ko', 'name');
  const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');
  const koGeneraText = langFilterAndAccessor(genera, 'ko', 'genus') || langFilterAndAccessor(genera, 'en', 'genus');
  const statsProcessing = stats?.map(stat => {
    return {
      [stat.stat.name]: stat.base_stat,
    };
  });
  const pokemonDetailData = {
    abilities,
    habitat,
    capture_rate,
    koName,
    koFlavorText,
    koGeneraText,
    color,
    height,
    weight,
    sprites,
    is_legendary,
    is_mythical,
    statsProcessing,
    name,
    types,
  };

  return {
    pokemonData,
    speciesData,
    pokemonDetailData,
    isLoading,
    isError,
    error,
  };
};

export default usePokemonAndSpecies;
