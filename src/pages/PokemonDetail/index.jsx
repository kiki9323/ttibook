import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { DropBox } from '@components/DropBox';
import { ErrorComponent } from '@components/ErrorComponent';
import { Layout } from '@layout/Layout';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonAbilities } from '@pages/PokemonDetail/PokemonAbilities';
import { PokemonEvolution } from '@components/PokemonEvolution';
import { SpritesList } from '@components/SpritesList';
import { StatsChart } from '../PokemonIndex/StatsChart';
import { fetchPokemonTotalCount } from '@/api/pokemonApi';
import { formatNumber } from '@/utils/utils';
import style from './index.module.scss';
import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

export const PokemonDetail = () => {
  const { id } = useParams();
  const currentId = Number(id);
  const [lastId, setLastId] = useState(0);

  const { pokemonDetailData, isLoading, isError, error } = usePokemonAndSpecies(currentId);

  useEffect(() => {
    const getTotal = async () => {
      const response = await fetchPokemonTotalCount();
      setLastId(response);
    };
    getTotal();
  }, []);

  if (isLoading) return <LoadingComponent loadingMessage={'상세 페이지로 이동 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <Layout>
      <Layout.Title>상세 페이지</Layout.Title>
      <Layout.Contents>
        <div className={style.detail}>
          <nav className={style.detail_nav}>
            {currentId > 1 && (
              <Link to={`/pokemon-detail/${currentId - 1}`}>
                <span className={`${style.link_btn} ${style.link_prev}`}>이전</span>
              </Link>
            )}
            {currentId < lastId && (
              <Link to={`/pokemon-detail/${currentId + 1}`}>
                <span className={`${style.link_btn} ${style.link_next}`}>다음</span>
              </Link>
            )}
          </nav>
          <strong className={style.detail_name}>
            {pokemonDetailData.koName}&nbsp;
            <span className={style.detail_id}>(#{formatNumber(id, 4)})</span>
          </strong>
          <div className={style.layout}>
            <div className={style.stats_box}>
              <strong>스탯</strong>
              <StatsChart
                statData={pokemonDetailData.statsProcessing}
                color={pokemonDetailData.color.name}
                name={pokemonDetailData.koName}
              />
            </div>
          </div>
          <div className={style.layout}>
            <SpritesList sprites={pokemonDetailData.sprites} />
            <p className={style.info_desc}>{pokemonDetailData.koFlavorText}</p>
            <DropBox title={'진화'}>
              <PokemonEvolution id={id} />
            </DropBox>
          </div>
          <div className={style.layout}>
            <dl className={style.info}>
              <h2 className="blind">포켓몬 상세 설명</h2>
              {pokemonDetailData.is_legendary && <strong>전설 포켓몬</strong>}
              {pokemonDetailData.is_mythical && <strong>신화 포켓몬</strong>}
              <PokemonAbilities
                abilities={pokemonDetailData.abilities}
                habitat={pokemonDetailData.habitat}
                capture_rate={pokemonDetailData.capture_rate}
                genus={pokemonDetailData.koGeneraText}
                color={pokemonDetailData.color}
                height={pokemonDetailData.height}
                weight={pokemonDetailData.weight}
              />
            </dl>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
