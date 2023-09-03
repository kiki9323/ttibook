import React, { useEffect, useRef, useState } from 'react';
import { formatNumber, langFilterAndAccessor } from '@/utils/utils';

import { ErrorComponent } from '@components/ErrorComponent';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonType } from '@components/PokemonType';
import { fetchDataFromUrls } from '@/api/pokemonApi';
import { instance } from '@/api/axiosConfig';
import { pokemonTypeTranslationAndColor } from '@/utils/constants';
import style from './index.module.scss';
import useGetAllPokemon from '@/hooks/useGetAllPokemon';

export const PokemonLists = () => {
  const { data, status, fetchNextPage, hasNextPage } = useGetAllPokemon(20);

  let pokeResult = [];
  let speciesResult = [];

  if (status === 'success') {
    data.pages.forEach(page => {
      pokeResult.push(...page.data[0]);
      speciesResult.push(...page.data[1]);
    });
  }

  const fetchAdditionalData = async (pokeResult, speciesResult) => {
    if (!pokeResult || !speciesResult) return;

    let pokeUrls = pokeResult.map(item => item.url);
    let speciesUrls = speciesResult.map(item => item.url);

    try {
      const [pokeResponses, speciesResponses] = await Promise.all([
        fetchDataFromUrls(pokeUrls),
        fetchDataFromUrls(speciesUrls),
      ]);

      return [pokeResponses, speciesResponses];
    } catch (error) {
      throw new Error('Failed to "fetchDataDetails"' + error.message);
    }
  };

  const [mergedAllData, setMergedAllData] = useState([]);
  const loadTriggerRef = useRef();

  useEffect(() => {
    if (status === 'success') {
      fetchAdditionalData(pokeResult, speciesResult).then(([pokeResponse, speciesResponse]) => {
        setMergedAllData(
          pokeResponse.map(poke => {
            return { ...poke, ...speciesResponse.find(species => species.id === poke.id) };
          }),
        );
      });
    }
  }, [status, mergedAllData]);

  useEffect(() => {
    let observer;

    if (loadTriggerRef.current && hasNextPage) {
      observer = new IntersectionObserver(
        entries => {
          entries[0].isIntersecting && fetchNextPage();
        },
        {
          threshold: 0.5,
        },
      );
      observer.observe(loadTriggerRef.current);
    }
    return () => observer?.disconnect();
  }, [hasNextPage]);

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
        {mergedAllData &&
          mergedAllData.map(pokemon => {
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

            const typesResult = types.map(type => type.type.name);
            const abilityResult = abilities.map(ability => ability.ability.name);

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
        <li className={style.item} ref={loadTriggerRef} style={{ height: '300px', background: 'pink' }}>
          로오딩 <br />
          로오딩 <br />
          로오딩 <br />
        </li>
      </ul>
    </div>
  );
};
