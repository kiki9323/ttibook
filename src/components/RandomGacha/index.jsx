import { useEffect, useMemo, useState } from 'react';

import { API_BASE_URL } from '../../api/apiConfig';
import { Card } from './Card';
import { LoadingComponent } from '@components/LoadingComponent';
import axios from 'axios';
import style from './index.module.scss';

export const RandomGacha = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [gachaPokemon, setGachaPokemon] = useState(null);
  const [notification, setNotification] = useState('');

  const randomId = Math.floor(Math.random() * 1000) + 1;

  const handleGacha = async () => {
    setIsLoading(true);
    setShowCard(false);
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${randomId}`);
      const result = response.data;

      setGachaPokemon(result);
      setIsLoading(false);

      setNotification(`포켓몬 ${result.name} (ID: ${result.id})을(를) 뽑았다!`);

      setTimeout(() => {
        setNotification('');
        setShowCard(true);
      }, 3000);
    } catch (error) {
      // nothing to do
    } finally {
      setIsLoading(false);
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
