import { Link, useParams } from 'react-router-dom';
import { formatNumber, langFilterAndAccessor } from '@/utils/utils';
import { useEffect, useState } from 'react';

import { DropBox } from '@components/DropBox';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonAbilities } from './PokemonAbilities';
import { PokemonEvolution } from '../PokemonEvolution';
import { SpritesList } from './SpritesList';
import { StatsChart } from '../PokemonIndex/StatsChart';
import { fetchPokemonTotalCount } from '@/api/pokemonApi';
import style from './index.module.scss';
import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

export const PokemonDetail = () => {
  const { id } = useParams();
  const currentId = Number(id);
  const [lastId, setLastId] = useState(0);

  const { pokemonData, speciesData, isLoading, isError, error } = usePokemonAndSpecies(currentId);

  useEffect(() => {
    const getTotal = async () => {
      const response = await fetchPokemonTotalCount();
      setLastId(response);
    };
    getTotal();
  }, []);

  if (isLoading) return <LoadingComponent loadingMessage={'상세 페이지로 이동 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  const { sprites, stats, height, weight } = pokemonData;
  const { flavor_text_entries, capture_rate, habitat, names, genera, color, is_legendary, is_mythical } = speciesData;

  const koName = langFilterAndAccessor(names, 'ko', 'name');
  const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');
  const koGeneraText = langFilterAndAccessor(genera, 'ko', 'genus') || langFilterAndAccessor(genera, 'en', 'genus');
  const statsProcessing = stats.map(stat => {
    return {
      [stat.stat.name]: stat.base_stat,
    };
  });

  return (
    <div className={style.detail}>
      <h1 className={style.detail_title}>상세 페이지</h1>
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
        {koName}&nbsp;
        <span className={style.detail_id}>(#{formatNumber(id, 4)})</span>
      </strong>
      <div className={style.layout}>
        <div className={style.stats_box}>
          <strong>스탯</strong>
          <StatsChart statData={statsProcessing} color={color.name} name={koName} />
        </div>
      </div>
      <div className={style.layout}>
        <SpritesList sprites={sprites} />
        <p className={style.info_desc}>{koFlavorText}</p>
        <DropBox title={'진화'}>
          <PokemonEvolution id={id} />
        </DropBox>
      </div>
      <div className={style.layout}>
        <dl className={style.info}>
          <h2 className="blind">포켓몬 상세 설명</h2>
          {is_legendary && <strong>전설 포켓몬</strong>}
          {is_mythical && <strong>신화 포켓몬</strong>}
          <PokemonAbilities
            abilities={pokemonData.abilities}
            habitat={habitat}
            capture_rate={capture_rate}
            genus={koGeneraText}
            color={color}
            height={height}
            weight={weight}
          />
        </dl>
      </div>
    </div>
  );
};
