import React, { useEffect, useState } from 'react';
import { formatNumber, langFilterAndAccessor } from '@/utils/utils';

import { ErrorComponent } from '@components/ErrorComponent';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonType } from '@components/PokemonType';
import { instance } from '@/api/axiosConfig';
import { pokemonTypeTranslationAndColor } from '@/utils/constants';
import style from './index.module.scss';
import useGetAllPokemon from '@/hooks/useGetAllPokemon';

export const PokemonLists = () => {
  const [mergedAllData, setMergedAllData] = useState([]);
  const {
    data: [resultPoke, resultSpecies],
    status,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useGetAllPokemon(10);

  const fetchDataDetails = async () => {
    const isExist = resultPoke?.length > 0 && resultSpecies?.length > 0;

    let pokeData = [];
    let speciesData = [];

    try {
      if (isExist) {
        const pokePromises = resultPoke?.map(pokemon => instance.get(pokemon.url));
        const speciesPromises = resultSpecies?.map(pokemon => instance.get(pokemon.url));

        const pokeResponses = await Promise.all(pokePromises);
        const speciesResponses = await Promise.all(speciesPromises);

        pokeData = pokeResponses.map(response => response.data);
        speciesData = speciesResponses.map(response => response.data);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to "fetchDataDetails"');
    }

    return { pokeData, speciesData };
  };

  useEffect(() => {
    fetchDataDetails().then(({ pokeData, speciesData }) => {
      setMergedAllData(
        pokeData.map(poke => {
          return { ...poke, ...speciesData.find(species => species.name === poke.name && species.id === poke.id) };
        }),
      );
    });
  }, [status]);

  if (status === 'loading') return <LoadingComponent loadingMessage={'포켓몬 불러오는 중'} />;
  if (status === 'error') return <ErrorComponent errorMessage={status.error.message} />;

  return (
    <div>
      <h1>포켓몬 도감</h1>
      <nav>
        {/* 검색창 */}
        {/* 필터링 */}
      </nav>
      <ul className={style.list}>
        {mergedAllData.map(pokemon => {
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

          const koName = langFilterAndAccessor(names, 'ko', 'name');
          const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');
          const koGeneraText = langFilterAndAccessor(genera, 'ko', 'genus');

          const statsProcessing = stats.map(stat => {
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

          const colors = types.map(type => pokemonTypeTranslationAndColor[type.type.name].color);
          const gradient = `linear-gradient(to top , ${colors
            .map((color, index) => {
              if (colors.length === 1 && index === colors.length - 1) {
                return `${color + '80'}, #fff`;
              } else {
                return color + '80';
              }
            })
            .join(', ')})`;

          return (
            <li key={id} className={style.item} style={{ background: `${gradient}` }}>
              <PokemonType typeName={types[0].type.name}>{koName}</PokemonType>
              <span className={style.id}>#{formatNumber(id, 4)}</span>
              <div className={style.img_box}>
                <img className={style.img} src={sprites.other.dream_world.front_default} alt={koName} />
              </div>
              <div>
                타입
                {types.map(({ type }, index) => (
                  <PokemonType typeName={type.name} key={index} />
                ))}
              </div>
              <p>종류: {koGeneraText}</p>
              <p>
                <span>키: {height * 10} cm</span> | <span>몸무게: {weight / 10} kg</span>
              </p>
              <Link to={`/pokemon-detail/${id}`}>상세보기</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
