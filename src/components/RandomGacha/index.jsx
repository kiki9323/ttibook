import { useEffect, useRef, useState } from 'react';

import { Card } from './Card';
import { LoadingComponent } from '@components/LoadingComponent';
import { getRandomNumber } from '@/utils/utils';
import style from './index.module.scss';
import useGetPokemon from '../../hooks/useGetPokemon';

export const RandomGacha = () => {
  const randomIdRef = useRef(getRandomNumber(1000));
  const [showCard, setShowCard] = useState(false);
  const [gachaPokemon, setGachaPokemon] = useState(null);
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(null);
  const { isLoading, error, refetch } = useGetPokemon(randomIdRef.current);
  const notificationTime = 2000;

  useEffect(() => {
    (async () => {
      const response = await refetch();
      setGachaPokemon(response.data);
    })();
  }, [randomIdRef.current]);

  const handleGacha = async () => {
    try {
      randomIdRef.current = getRandomNumber(1000);

      setShowCard(false);
      clearTimeout(timer);

      if (gachaPokemon) {
        setGachaPokemon(gachaPokemon);
        setNotification(
          `포켓몬 ${gachaPokemon.name} (ID: ${gachaPokemon.id})을(를) 뽑았다!`,
        );

        setTimer(
          setTimeout(() => {
            setNotification('');
            setShowCard(true);
          }, notificationTime),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <LoadingComponent />;

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
