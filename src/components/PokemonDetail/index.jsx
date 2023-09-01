import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatNumber, langFilterAndAccessor } from '@/utils/utils';
import { useContext, useEffect, useState } from 'react';

import { CaptureContext } from '../Context/captureContext';
import { DropBox } from '@components/DropBox';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonAbilites } from './PokemonAbilites';
import { PokemonEvolution } from '../PokemonEvolution';
import { SpritesList } from './SpritesList';
import { StatsChart } from '../PokemonLists/StatsChart';
import { fetchPokemonTotalCount } from '@/api/pokemonApi';
import style from './index.module.scss';
import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

const getInitialMyPokemon = () => {
  try {
    if (typeof window.localStorage === 'undefined') {
      throw new Error('Local Storage is not supported or accessible');
    }

    const savedData = localStorage.getItem('myMonster');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (e) {
    console.log('Error parsing local storage data', e);
  }
  return [];
};

export const PokemonDetail = () => {
  const HoverStatus = { NONE: 0, SHAKING: 1, FADING: 2 };

  const navigate = useNavigate();
  const { id } = useParams();
  const currentId = Number(id);
  const [lastId, setLastId] = useState(0);
  const handleGoHome = () => navigate('/random-gacha');

  useEffect(() => {
    const getTotal = async () => {
      const response = await fetchPokemonTotalCount();
      setLastId(response);
    };
    getTotal();
  }, []);

  const { pokemonData, speciesData, isLoading, isError, error } = usePokemonAndSpecies(currentId);

  const [myPokemon, setMyPokemon] = useState(getInitialMyPokemon());
  const [hoverStatus, setHoverStatus] = useState(HoverStatus.NONE);
  const { isCaptured, setIsCaptured } = useContext(CaptureContext);

  useEffect(() => {
    localStorage.setItem('myMonster', JSON.stringify(myPokemon));
  }, [myPokemon]);

  const handleCapture = () => {
    const MAX_POKEMON = 10;
    const newMyPokemon = {
      name: pokemonData.name,
      id,
      url: pokemonData.sprites.other['official-artwork'].front_default,
      color: pokemonData.color,
      types: pokemonData.types,
      liked: false,
    };

    // null 체크
    myPokemon.filter(item => item !== null);

    // 중복
    if (!myPokemon.find(e => e && e.id === newMyPokemon.id)) {
      if (myPokemon.length > MAX_POKEMON) {
        alert('10마리 이상 연속해서 포획했습니다. 욕심도 많군요.. 포켓몬 생태계를 파괴하실 작정입니까?');
      }
      setMyPokemon([...myPokemon, newMyPokemon]);
      alert(`${pokemonData.name}을(를) 잡았다!`);
      setIsCaptured(true);
    } else {
      return alert('이미 잡은 포켓몬 입니다.');
    }
  };

  if (isLoading) return <LoadingComponent loadingMessage={'상세 페이지로 이동 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  const { sprites, stats } = pokemonData;
  const { flavor_text_entries, capture_rate, habitat, names, genera, color, is_legendary, is_mythical } = speciesData;

  const koName = langFilterAndAccessor(names, 'ko', 'name');
  const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');
  const koGeneraText = langFilterAndAccessor(genera, 'ko', 'genus') || langFilterAndAccessor(genera, 'en', 'genus');

  const hoverShaking = hoverStatus === HoverStatus.SHAKING ? style.isShaking : '';
  const hoverFading = hoverStatus === HoverStatus.FADING ? style.isFading : '';

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
        <SpritesList sprites={sprites} hoverShaking={hoverShaking} hoverFading={hoverFading} />
        <p className={style.info_desc}>{koFlavorText}</p>
      </div>
      <div className={style.layout}>
        <div className={style.layout_inner}>
          <div className={style.stats_box}>
            <StatsChart statData={statsProcessing} color={color.name} name={koName} />
          </div>
          <dl className={style.info}>
            <h2 className="blind">포켓몬 상세 설명</h2>
            {is_legendary && <strong>전설 포켓몬</strong>}
            {is_mythical && <strong>신화 포켓몬</strong>}
            <PokemonAbilites
              abilities={pokemonData.abilities}
              habitat={habitat}
              capture_rate={capture_rate}
              genus={koGeneraText}
              color={color}
            />
          </dl>
        </div>
        <DropBox title={'진화'}>
          <PokemonEvolution id={id} />
        </DropBox>
      </div>
      <div className={style.interface}>
        <button
          onClick={handleGoHome}
          onMouseEnter={() => setHoverStatus(HoverStatus.FADING)}
          onMouseLeave={() => setHoverStatus(HoverStatus.NONE)}
        >
          {isCaptured ? `또 뽑자` : `다시 뽑을래..`}
        </button>
        <button
          onClick={handleCapture}
          onMouseEnter={() => setHoverStatus(HoverStatus.SHAKING)}
          onMouseLeave={() => setHoverStatus(HoverStatus.NONE)}
        >
          맘에 든다! 잡아버리자!
        </button>
      </div>
    </div>
  );
};
