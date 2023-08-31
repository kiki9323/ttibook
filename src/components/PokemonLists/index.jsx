import React, { useEffect, useState } from 'react';

import { ErrorComponent } from '@components/ErrorComponent';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonType } from '@components/PokemonType';
import { StatsChart } from './StatsChart';
import axios from 'axios';
import { formatNumber } from '@/utils/utils';
import { instance } from '@/api/axiosConfig';
import style from './index.module.scss';
import { useQuery } from 'react-query';

const fetchPokemonByRange = async (page, pageSize) => {
  const limitParams = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  try {
    const [pokeResponse, speciesResponse] = await Promise.all([
      instance.get(`/pokemon`, { params: limitParams }),
      instance.get(`/pokemon-species`, { params: limitParams }),
    ]);

    const resultPoke = pokeResponse.data.results;
    const resultSpecies = speciesResponse.data.results;

    return [resultPoke, resultSpecies];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to "fetchPokemonByRange"');
  }
};

export const PokemonLists = () => {
  const pageSize = 10;
  const {
    data: [resultPoke, resultSpecies] = [undefined, undefined],
    isLoading,
    isError,
    error,
  } = useQuery(['allPokemon'], async () => fetchPokemonByRange(1, pageSize), {
    keepPreviousData: true,
  });

  const [pokeData, setPokeData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [allPokeData, setAllPokeData] = useState([]);

  useEffect(() => {
    const fetchDataDetails = async () => {
      const isExist = resultPoke?.length > 0 && resultSpecies?.length > 0;

      try {
        if (isExist) {
          const pokePromises = resultPoke?.map(pokemon => axios.get(pokemon.url));
          const speciesPromises = resultSpecies?.map(pokemon => axios.get(pokemon.url));

          const pokeResponses = await Promise.all(pokePromises);
          const speciesResponses = await Promise.all(speciesPromises);

          const pokeData = pokeResponses.map(response => response.data);
          const speciesData = speciesResponses.map(response => response.data);

          return { pokeData, speciesData };
        }
      } catch (error) {
        console.log(error);
        throw new Error('Failed to "fetchDataDetails"');
      }
    };

    fetchDataDetails().then(({ pokeData, speciesData }) => {
      setPokeData(pokeData);
      setSpeciesData(speciesData);

      const mergedData = pokeData.map(poke => {
        const correspondingSpecie = speciesData.find(species => species.name === poke.name && species.id === poke.id);
        return { ...poke, ...correspondingSpecie };
      });

      setAllPokeData(mergedData);
    });
  }, [isLoading, isError]);

  if (isLoading) return <LoadingComponent loadingMessage={'포켓몬 불러오는 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <div>
      <h1>포켓몬 도감</h1>
      <ul className={style.list}>
        {allPokeData.map(pokemon => {
          const {
            id,
            names,
            types,
            weight,
            height,
            stats,
            abilities,
            shape,
            flavor_text_entries,
            genera,
            color,
            sprites,
          } = pokemon;

          const typesResult = types.map(type => type.type.name); //  ['grass', 'poison']
          const abilityResult = abilities.map(ability => ability.ability.name); //  ['grass', 'poison']

          const filterByLanguage = (arr, lang) => arr.filter(item => item.language.name === lang);

          const selectRandomly = arr => {
            if (!arr.length) return null;

            const randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
          };

          const langFilter = (arr, lang) => {
            const filteredArr = filterByLanguage(arr, lang);
            if (!filteredArr.length) return null;

            return selectRandomly(filteredArr);
          };

          const langFilterAndAccessor = (arr, lang, fieldName) => {
            const result = langFilter(arr, lang);

            return result ? result[fieldName] : null;
          };

          const koName = langFilterAndAccessor(names, 'ko', 'name');
          const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');
          const koGeneraText = langFilterAndAccessor(genera, 'ko', 'genus');

          const statsProcessing = stats.map(stat => {
            // {hp: 45},{attack: 49},{defense: 49},{special-attack: 65},{special-defense: 65},{speed: 45}
            // => {hp: 45},{attack: 49},{defense: 49}
            // const list = ['hp', 'attack', 'defense', 'speed'];
            // if (!list.includes(stat.stat.name)) return [];
            return {
              [stat.stat.name]: stat.base_stat,
            };
          });

          const statsResult = statsProcessing.map((stat, index) => {
            return Object.entries(stat).map(([key, value]) => {
              return (
                <p key={`${key}-${index}`}>
                  {key}: {value}
                </p>
              );
            });
          });

          return (
            <li key={id} className={style.item}>
              <Link to={`/pokemon-detail/${id}`}>
                <div className={style.img_wrap}>
                  <div className={style.img_box}>
                    <img className={style.img} src={sprites.other.dream_world.front_default} alt={koName} />
                  </div>
                  <span className={style.id}>#{formatNumber(id, 4)}</span>
                </div>
                <div className={style.attr}>
                  <div className={style.stats_chart}>
                    <StatsChart statData={statsProcessing} color={color.name} name={koName} />
                  </div>
                  <div className={style.img_sub_box}>
                    <img
                      className={style.img_sub}
                      src={sprites.versions[`generation-v`][`black-white`].animated.front_default}
                      alt={koName}
                    />
                    <img
                      className={style.img_sub}
                      src={sprites.versions[`generation-v`][`black-white`].animated.back_default}
                      alt={koName}
                    />
                  </div>
                  <>{(typesResult, abilityResult)}</>
                </div>
                <div className={style.desc}>
                  <PokemonType type={types[0].type.name}>{koName}</PokemonType>
                  <p>종류: {koGeneraText}</p>
                  <span className={style.flavor_text}>{koFlavorText}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
