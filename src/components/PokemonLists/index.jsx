import { formatNumber, langFilterAndAccessor } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';

import { ErrorComponent } from '@components/ErrorComponent';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonType } from '@components/PokemonType';
import { fetchDataFromUrls } from '@/api/pokemonApi';
import { pokemonTypeTranslationAndColor } from '@/utils/constants';
import style from './index.module.scss';
import useGetAllPokemon from '@/hooks/useGetAllPokemon';

export const PokemonLists = () => {
  const { data, status, fetchNextPage, hasNextPage } = useGetAllPokemon(10);
  const [pokeResult, setPokeResult] = useState([]);
  const [speciesResult, setSpeciesResult] = useState([]);
  const [mergedAllData, setMergedAllData] = useState([]);
  const loadTriggerRef = useRef();

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

  useEffect(() => {
    if (status === 'success') {
      const newPokeResult = [];
      const newSpeciesResult = [];

      // data.pages.forEach를 사용하여 새로운 데이터를 가져옴
      data.pages.forEach(page => {
        newPokeResult.push(...page.data[0]);
        newSpeciesResult.push(...page.data[1]);
      });

      // 이전 값과 새로운 값을 합쳐서 업데이트
      setPokeResult([...newPokeResult]);
      setSpeciesResult([...newSpeciesResult]);

      fetchAdditionalData(pokeResult, speciesResult).then(([pokeResponse, speciesResponse]) => {
        const newData = pokeResponse.map(poke => {
          return { ...poke, ...speciesResponse.find(species => species.id === poke.id) };
        });
        // 새롭게 받아온 데이터만 추가
        setMergedAllData([...newData]);
      });
    }
  }, [status, data]);

  useEffect(() => {
    let observer;

    if (loadTriggerRef.current && hasNextPage) {
      observer = new IntersectionObserver(
        entries => {
          entries[0].isIntersecting && fetchNextPage();
        },
        {
          threshold: 1,
        },
      );
      observer.observe(loadTriggerRef.current);
    }
    return () => observer?.disconnect();
  }, [fetchNextPage, hasNextPage]);

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
        {mergedAllData.map(pokemons => {
          const { id, names, types, sprites } = pokemons;

          const koName = langFilterAndAccessor(names, 'ko', 'name');
          const colors = types.map(type => pokemonTypeTranslationAndColor[type.type.name].color);
          const gradient = `linear-gradient(to top , ${colors
            .map((color, index) => {
              if (colors.length === 1 && index === colors.length - 1) {
                return `${color + '50'}, #cacaca`;
              } else {
                return color + '50';
              }
            })
            .join(', ')})`;

          return (
            <li key={id} className={style.item} style={{ background: `${gradient}` }}>
              <Link to={`/pokemon-detail/${id}`}>
                <div className={style.img_box}>
                  <div className={style.name}>
                    <PokemonType as="h2" typeName={types[0].type.name}>
                      {koName}
                    </PokemonType>
                    <p className={style.id}>#{formatNumber(id, 4)}</p>
                  </div>
                  <div className={style.img_box_inner}>
                    <img className={style.img} src={sprites.other.dream_world.front_default} alt={koName} />
                  </div>
                </div>
                <div className={style.types}>
                  {types.map(({ type }, index) => (
                    <PokemonType typeName={type.name} key={index} />
                  ))}
                </div>
              </Link>
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
