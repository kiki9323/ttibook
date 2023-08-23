import { Children, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { PokemonEvolution } from '../PokemonEvolution';
import { SpritesImage } from './SpritesImage';
import { getRandomNumber } from '@/utils/utils';
import { rearrangeStrings } from '../../utils/utils';
import style from './index.module.scss';
import { usePokemonAndSpecies } from '../../hooks/useGetPokemonAndSpecies';

const getRandomText = texts => {
  if (texts.length === 0) return '텍스트 정보가 없습니다';

  const randomIndex = getRandomNumber(texts.length);
  const flavorText = texts[randomIndex]?.flavor_text;

  return flavorText ?? '텍스트 정보가 없습니다';
};

export const PokemonDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const regex = /_default$/;
  const { pokemonData, speciesData, isLoading, error } = usePokemonAndSpecies(id);
  const HoverStatus = {
    NONE: 0,
    SHAKING: 1,
    FADING: 2,
  };
  const [hoverStatus, setHoverStatus] = useState(HoverStatus.NONE);
  const [randomText, setRandomText] = useState('텍스트 정보가 없습니다');
  const [myPokemon, setMyPokemon] = useState(() => {
    const savedData = localStorage.getItem('myMonster');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    console.log('Detail', myPokemon);
    localStorage.setItem('myMonster', JSON.stringify(myPokemon));
  }, [myPokemon]);

  const handleCapture = () => {
    const newMyPokemon = {
      name: pokemonData.name,
      id,
      url: pokemonData.sprites.other['official-artwork'].front_default,
      color: pokemonData.color,
    };

    if (!myPokemon.find(e => e.id === newMyPokemon.id)) {
      if (myPokemon.length > 10) {
        alert('10마리 이상 연속해서 포획했습니다. 욕심도 많군요.. 포켓몬 생태계를 파괴하실 작정입니까?');
      }
      setMyPokemon([...myPokemon, newMyPokemon]);
    } else {
      return alert('이미 잡은 포켓몬 입니다.');
    }
  };

  useEffect(() => {
    if (!speciesData || isLoading || error) return;

    const { flavor_text_entries, names } = speciesData;
    const filteredKoreanTexts = flavor_text_entries.filter(entry => entry.language.name === 'ko');

    const newRandomText = getRandomText(filteredKoreanTexts);
    setRandomText(newRandomText);
  }, [speciesData, error, isLoading]);

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent errorMessage={error.message} />;

  const handleGoHome = () => {
    navigate('/');
  };

  const { capture_rate, color, genera, names, is_legendary, is_mythical } = speciesData;
  const defaultSprites = Object.entries(pokemonData.sprites).sort(rearrangeStrings('front_', 'back_'));

  return (
    <div className={style.detail}>
      <nav className={style.detail_nav}>
        <h1>상세 페이지</h1>
        <button onClick={() => navigate('/myCollection')}>내 포켓몬 북</button>
      </nav>
      <strong className={style.detail_name}>
        {names.filter(entry => entry.language.name === 'ko')[0].name}
        <span style={{ color: '#b6b6b6' }}>(#{id})</span>
      </strong>
      <div className={style.layout}>
        <ul className={style.sprite_list}>
          {defaultSprites.map(([key, imgSrc], idx) => {
            if (!imgSrc || !regex.test(key)) return null;
            return (
              <SpritesImage
                key={key + idx}
                spriteName={key}
                imgSrc={imgSrc}
                hoverStatus={`${hoverStatus === HoverStatus.FADING ? style.isFading : ''} ${
                  hoverStatus === HoverStatus.SHAKING ? style.isShaking : ''
                }`}
              />
            );
          })}
        </ul>
        <PokemonEvolution id={id} />
      </div>
      <div className={`${style.layout} ${style.info} ${style.box_round}`}>
        {is_legendary && <div>전설 포켓몬</div>}
        {is_mythical && <div>신화 포켓몬</div>}
        <div className={style.info_ability}>
          능력 :{' '}
          {pokemonData.abilities.map((item, idx) => (
            <span key={idx} style={{ marginRight: '5px' }}>
              {item.ability.name}
            </span>
          ))}
        </div>
        <div>포획률 : {capture_rate} / 255</div>
        <div>
          상징 색 : <span className={style.info_color} style={{ backgroundColor: `${color.name}` }}></span>
          {color.name}
        </div>
        <p className={style.info_text}>{randomText}</p>
      </div>
      <div className={style.interface}>
        <button
          onClick={handleGoHome}
          onMouseEnter={() => setHoverStatus(HoverStatus.FADING)}
          onMouseLeave={() => setHoverStatus(HoverStatus.NONE)}
        >
          다시 뽑을래..
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
