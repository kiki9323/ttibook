import { findLang, getRandomNumber, rearrangeStrings } from '@/utils/utils';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CaptureContext } from '../Context/captureContext';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonAbilites } from './PokemonAbilites';
import { PokemonEvolution } from '../PokemonEvolution';
import { SpritesList } from './SpritesList';
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

const MAX_POKEMON = 10;
const DEFAULT_TEXT = '텍스트 정보가 없습니다';

export const PokemonDetail = () => {
  const HoverStatus = { NONE: 0, SHAKING: 1, FADING: 2 };

  const navigate = useNavigate();
  const { id } = useParams();

  const { pokemonData, speciesData, isLoading, isError, error } = usePokemonAndSpecies(id);

  const [myPokemon, setMyPokemon] = useState(getInitialMyPokemon());
  const [hoverStatus, setHoverStatus] = useState(HoverStatus.NONE);
  const [randomText, setRandomText] = useState(DEFAULT_TEXT);
  const { isCaptured, setIsCaptured } = useContext(CaptureContext);

  useEffect(() => {
    localStorage.setItem('myMonster', JSON.stringify(myPokemon));
  }, [myPokemon]);

  const handleCapture = () => {
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

  const getRandomText = texts => {
    if (texts.length === 0) return DEFAULT_TEXT;

    const randomIndex = getRandomNumber(texts.length) - 1;
    const flavorText = texts[randomIndex]?.flavor_text;

    return flavorText;
  };

  useEffect(() => {
    if (!speciesData || isLoading || isError) return;

    const { flavor_text_entries } = speciesData;
    const filteredKoreanTexts = flavor_text_entries.filter(entry => entry.language.name === 'ko');

    setRandomText(getRandomText(filteredKoreanTexts));
  }, [speciesData, error, isLoading]);

  if (isLoading) return <LoadingComponent loadingMessage={'상세 페이지로 이동 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  const handleGoHome = () => navigate('/random-gacha');

  const { capture_rate, habitat, names, genera, color, is_legendary, is_mythical } = speciesData || {};

  const genus = findLang(genera, 'ko') || findLang(genera, 'en');
  const hoverShaking = hoverStatus === HoverStatus.SHAKING ? style.isShaking : '';
  const hoverFading = hoverStatus === HoverStatus.FADING ? style.isFading : '';

  return (
    <div className={style.detail}>
      <nav className={style.detail_nav}>
        <h1>상세 페이지</h1>
      </nav>
      <strong className={style.detail_name}>
        {names.filter(entry => entry.language.name === 'ko')[0].name}
        <span className={style.detail_id}>(#{id})</span>
      </strong>
      <div className={style.layout}>
        <SpritesList sprites={pokemonData.sprites} hoverShaking={hoverShaking} hoverFading={hoverFading} />
        <PokemonEvolution id={id} />
      </div>
      <dl className={`${style.layout} ${style.info} ${style.box_round}`}>
        <h2 className="blind">포켓몬 상세 설명</h2>
        {is_legendary && <strong>전설 포켓몬</strong>}
        {is_mythical && <strong>신화 포켓몬</strong>}
        <PokemonAbilites
          abilities={pokemonData.abilities}
          habitat={habitat}
          capture_rate={capture_rate}
          genus={genus}
          color={color}
        />
        <p className={style.info_desc}>{randomText}</p>
      </dl>
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
