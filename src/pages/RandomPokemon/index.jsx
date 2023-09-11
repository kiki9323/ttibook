import { formatNumber, langFilterAndAccessor } from '@/utils/utils';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CaptureContext } from '@/context/IsCapturedContext';
import { ErrorComponent } from '@components/ErrorComponent';
import { Layout } from '@layout/Layout';
import { LoadingComponent } from '@components/LoadingComponent';
import { POKEMON_LIKED_KEY } from '@/utils/constants';
import { SpritesList } from '@components/SpritesList';
import style from './index.module.scss';
import useLocalStorage from '@/hooks/useLocalStroage';
import usePokemonAndSpecies from '@/hooks/useGetPokemonAndSpecies';

export const RandomPokemon = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentId = Number(id);

  const [state, setState] = useLocalStorage(POKEMON_LIKED_KEY, []);
  const [myPokemon, setMyPokemon] = useState(state);

  const HoverStatus = { NONE: 0, SHAKING: 1, FADING: 2 };
  const [hoverStatus, setHoverStatus] = useState(HoverStatus.NONE);
  const { isCapture, setIsCaptured } = useContext(CaptureContext);

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
      const newState = [...myPokemon, newMyPokemon];
      setMyPokemon(newState);
      setState(newState);
      alert(`${pokemonData.name}을(를) 잡았다!`);
      setIsCaptured(true);
    } else {
      return alert('이미 잡은 포켓몬 입니다.');
    }
  };

  if (isLoading) return <LoadingComponent loadingMessage={'포켓몬 잡으러 가는 중'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  const { sprites } = pokemonData;
  const { flavor_text_entries, capture_rate, names, is_legendary, is_mythical } = speciesData;

  const koName = langFilterAndAccessor(names, 'ko', 'name');
  const koFlavorText = langFilterAndAccessor(flavor_text_entries, 'ko', 'flavor_text');

  return (
    <Layout>
      <Layout.Title>포켓몬 잡기</Layout.Title>
      <Layout.Contents>
        <div className={style.capture}>
          <div className={style.capture_inner}>
            <strong className={style.capture_name}>
              {koName}&nbsp;
              <span className={style.capture_id}>(#{formatNumber(id, 4)})</span>
            </strong>
            <div className={style.capture_desc}>
              <strong className={style.attr}>
                <span>{is_legendary && '레전드 포켓몬'}</span>
                <span>{is_mythical && '신화 포켓몬'}</span>
              </strong>
              <p className={style.info}>{koFlavorText}</p>
              <SpritesList sprites={sprites} />
            </div>
          </div>
          <div className={style.interface}>
            <div className={style.interface_inner}>
              <button onClick={handleGoHome}>풀어준다.</button>
              <button onClick={handleCapture}>맘에 든다! 잡아버리자!</button>
            </div>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
