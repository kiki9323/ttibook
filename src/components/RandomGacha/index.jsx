import { useEffect, useRef, useState } from 'react';

import { Card } from './Card';
import { LoadingComponent } from '@components/LoadingComponent';
import { getRandomId } from '@/utils/utils';
import style from './index.module.scss';
import useFetchPokemon from '../../hooks/useFetchPokemon';

export const RandomGacha = () => {
  const randomIdRef = useRef(getRandomId());
  const [showCard, setShowCard] = useState(false);
  const [gachaPokemon, setGachaPokemon] = useState(null);
  const [notification, setNotification] = useState('');
  const [timer, setTimer] = useState(null);
  const { isLoading, error, refetch } = useFetchPokemon(randomIdRef.current);
  const notificationTime = 2000;

  useEffect(() => {
    (async () => {
      const response = await refetch();
      setGachaPokemon(response.data);
    })();
  }, [randomIdRef.current]);

  const handleGacha = async () => {
    try {
      randomIdRef.current = getRandomId();

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
    </div>
  );
};
