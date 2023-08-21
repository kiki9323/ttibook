import { useEffect, useState } from 'react';
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
  const { pokemonData, speciesData, isLoading, error } =
    usePokemonAndSpecies(id);

  const [randomText, setRandomText] = useState('텍스트 정보가 없습니다');

  useEffect(() => {
    if (!speciesData || isLoading || error) return;

    const { flavor_text_entries, names } = speciesData;
    const filteredKoreanTexts = flavor_text_entries.filter(
      entry => entry.language.name === 'ko',
    );

    const newRandomText = getRandomText(filteredKoreanTexts);
    setRandomText(newRandomText);
  }, [speciesData, error, isLoading]);

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;

  const goHome = () => {
    navigate('/');
  };

  const { capture_rate, color, genera, names, is_legendary, is_mythical } =
    speciesData;

  const defaultSprites = Object.entries(pokemonData.sprites).sort(
    rearrangeStrings('front_', 'back_'),
  );

  return (
    <div className={style.detail}>
      <nav className={style.detail_nav}>
        <h1>상세 보기</h1>
        <button onClick={() => navigate('/myCollection')}>내 포켓몬 북</button>
      </nav>
      <strong>
        {names.filter(entry => entry.language.name === 'ko')[0].name} (#
        {id})
      </strong>
      <div className={style.layout}>
        <ul className={style.sprite_list}>
          {defaultSprites.map(([key, imgSrc], idx) => {
            if (!imgSrc || !regex.test(key)) return null;
            return (
              <SpritesImage key={key + idx} spriteName={key} imgSrc={imgSrc} />
            );
          })}
        </ul>
        <PokemonEvolution id={id} />
      </div>
      <div className={`${style.layout} ${style.info}`}>
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
        <div>상징 색 : {color.name}</div>
        <p className={style.info_text}>{randomText}</p>
      </div>
      <div className={style.interface}>
        <button onClick={goHome}>다시 뽑을래.</button>
        <button>맘에 든다! 잡아버리자!</button>
      </div>
    </div>
  );
};
