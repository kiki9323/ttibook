import { formatNumber, langFilterAndAccessor } from '@/utils/utils';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CaptureContext } from '../Context/captureContext';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { SpritesList } from '../PokemonDetail/SpritesList';
import { fetchPokemonTotalCount } from '@/api/pokemonApi';
import style from './index.module.scss';
import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

const HoverStatus = { NONE: 0, SHAKING: 1, FADING: 2 };

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

export const RandomPokemon = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentId = Number(id);

  const [myPokemon, setMyPokemon] = useState(getInitialMyPokemon());
  const [hoverStatus, setHoverStatus] = useState(HoverStatus.NONE);
  const { isCaptured, setIsCaptured } = useContext(CaptureContext);

  const { pokemonData, speciesData, isLoading, isError, error } = usePokemonAndSpecies(currentId);

  const handleGoHome = () => navigate('/random-gacha');

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

  useEffect(() => {
    localStorage.setItem('myMonster', JSON.stringify(myPokemon));
  }, [myPokemon]);

  if (isLoading) return <LoadingComponent loadingMessage={'상세 페이지로 이동 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  const { sprites } = pokemonData;
  const { flavor_text_entries, capture_rate, names, is_legendary, is_mythical } = speciesData;

  const koName = langFilterAndAccessor(names, 'ko', 'name');
  const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');

  const hoverShaking = hoverStatus === HoverStatus.SHAKING ? style.isShaking : '';
  const hoverFading = hoverStatus === HoverStatus.FADING ? style.isFading : '';

  return (
    <div className={style.detail}>
      <h1 className={style.detail_title}>포켓몬 랜덤 뽑기</h1>
      <div className={style.detail_inner}>
        <strong className={style.detail_name}>
          {koName}&nbsp;
          <span className={style.detail_id}>(#{formatNumber(id, 4)})</span>
        </strong>
        <div className={style.layout}>
          <SpritesList sprites={sprites} hoverShaking={hoverShaking} hoverFading={hoverFading} />
          <p className={style.info_desc}>{koFlavorText}</p>
        </div>
      </div>
      <div className={style.interface}>
        <button
          onClick={handleGoHome}
          onMouseEnter={() => setHoverStatus(HoverStatus.FADING)}
          onMouseLeave={() => setHoverStatus(HoverStatus.NONE)}
        >
          풀어준다.
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
