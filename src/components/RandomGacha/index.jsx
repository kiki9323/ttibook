import { useEffect, useRef, useState } from 'react';

import { Card } from './Card';
import { ErrorComponent } from '@components/ErrorComponent';
import { LoadingComponent } from '@components/LoadingComponent';
import { getRandomNumber } from '@/utils/utils';
import style from './index.module.scss';
import useGetPokemon from '../../hooks/useGetPokemon';

export const RandomGacha = () => {
  const [randomId, setRandomId] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(null);
  const [gachaPokemon, setGachaPokemon] = useState(null);
  const NOTI_TIME = 2000;

  const handleGacha = async () => {
    setRandomId(getRandomNumber(1000));

    setShowCard(false);
    clearTimeout(timer);

    if (pokemonData) {
      setGachaPokemon(pokemonData);
      setNotification(
        `포켓몬 ${pokemonData.name} (ID: ${pokemonData.id})을(를) 뽑았다!`,
      );
      setTimer(
        setTimeout(() => {
          setNotification('');
          setShowCard(true);
        }, NOTI_TIME),
      );
    }
  };

  const {
    data: pokemonData,
    isLoading,
    error,
    refetch,
  } = useGetPokemon(randomId);

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent />;

  return (
    <div className={style.gacha}>
      <button onClick={handleGacha} className={style.gacha_btn}>
        랜덤 포켓몬 뽑기
      </button>
      {gachaPokemon && (
        <>
          <div className={style.notification}>{notification}</div>
          {showCard && <Card gachaPokemon={gachaPokemon} />}
        </>
      )}
      <div>
        <button>저장하기</button>
        <button>공유하기</button>
      </div>
    </div>
  );
};
