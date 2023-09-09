import { formatNumber, gradientBackgroundColor, langFilterAndAccessor } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';

import { ErrorComponent } from '@components/ErrorComponent';
import { Layout } from '../../layout/Layout';
import { Link } from 'react-router-dom';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonType } from '@components/PokemonType';
import { fetchDataFromUrls } from '@/api/pokemonApi';
import { pokemonTypeTranslationAndColor } from '@/utils/constants';
import style from './index.module.scss';
import useGetAllPokemon from '@/hooks/useGetAllPokemon';
import useIntersectionObserver from '@/hooks/useObserver';

export const PokemonIndex = () => {
  const { data, status, fetchNextPage, hasNextPage } = useGetAllPokemon(10);
  const [pokeResult, setPokeResult] = useState([]);
  const [speciesResult, setSpeciesResult] = useState([]);
  const [mergedAllData, setMergedAllData] = useState([]);
  const loadTriggerRef = useRef();

  const fetchAdditionalData = async (pokeResult, speciesResult) => {
    const extractUrls = dataResults => dataResults.map(item => item.url);
    const pokeUrls = extractUrls(pokeResult);
    const speciesUrls = extractUrls(speciesResult);

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

      data.pages.forEach(page => {
        newPokeResult.push(...page.data[0]);
        newSpeciesResult.push(...page.data[1]);
      });

      setPokeResult([...newPokeResult]);
      setSpeciesResult([...newSpeciesResult]);

      fetchAdditionalData(pokeResult, speciesResult).then(([pokeResponse, speciesResponse]) => {
        const newData = pokeResponse.map(poke => {
          const matchingSpecies = speciesResponse.find(species => species.id === poke.id);
          if (matchingSpecies) {
            return { ...poke, ...matchingSpecies };
          }
          return poke;
        });
        setMergedAllData([...newData]);
      });
    }
  }, [status, data]);

  useIntersectionObserver(loadTriggerRef, fetchNextPage, hasNextPage);

  if (status === 'loading') return <LoadingComponent loadingMessage={'포켓몬 불러오는 중'} />;
  if (status === 'error') return <ErrorComponent errorMessage={status.error.message} />;

  return (
    <Layout>
      <Layout.Title>포켓몬 도감</Layout.Title>
      <Layout.Contents>
        <ul className={style.list}>
          {mergedAllData.map(pokemon => {
            const { id, names, types, sprites } = pokemon;

            const koName = langFilterAndAccessor(names, 'ko', 'name');
            const colors = types.map(type => pokemonTypeTranslationAndColor[type.type.name].color);
            const gradient = gradientBackgroundColor(colors);

            return (
              <li key={id} className={style.item} style={{ background: `${gradient}` }}>
                <Link to={`/pokemon-detail/${id}`}>
                  <div className={style.img_box}>
                    <div className={style.name}>
                      <PokemonType as="strong" typeName={types[0].type.name}>
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
      </Layout.Contents>
    </Layout>
  );
};
