import { useEffect, useRef, useState } from 'react';

import { Card } from './Card';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { getRandomNumber } from '@/utils/utils';
import style from './index.module.scss';
import useGetPokemon from '@/hooks/useGetPokemon';

export const RandomGacha = () => {
  const [randomId, setRandomId] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [notification, setNotification] = useState('');
  const { data: pokemonData, isLoading, isError, error, refetch } = useGetPokemon(randomId);
  const [gachaPokemon, setGachaPokemon] = useState(null);
  const NOTI_TIME = 2000;
  const timerId = useRef();

  const handleGacha = async () => {
    setRandomId(getRandomNumber(1000));
  };

  useEffect(() => {
    setShowCard(false);

    if (pokemonData) {
      setGachaPokemon(pokemonData);
      setNotification(`포켓몬 ${pokemonData.name} (ID: ${pokemonData.id})을(를) 뽑았다!`);

      timerId.current = setTimeout(() => {
        setNotification('');
        setShowCard(true);
      }, NOTI_TIME);
    }

    return () => clearTimeout(timerId.current);
  }, [pokemonData]);

  if (isLoading) return <LoadingComponent loadingMessage={'뽑는 중...'} />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <div className={style.gacha}>
      <button onClick={handleGacha} className={style.gacha_btn}>
        랜덤 포켓몬 뽑기
      </button>
      <div>
        {gachaPokemon && (
          <>
            <div className={style.notification}>{notification}</div>
            <button>공유하기</button>
            {showCard && (
              <Card>
                <Card.Front
                  id={gachaPokemon.id}
                  types={gachaPokemon.types}
                  name={gachaPokemon.name}
                  imageSrc={gachaPokemon.sprites.other['official-artwork'].front_default}
                />
                <Card.Back
                  id={gachaPokemon.id}
                  types={gachaPokemon.types}
                  abilities={gachaPokemon.abilities}
                  height={gachaPokemon.height}
                />
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};
