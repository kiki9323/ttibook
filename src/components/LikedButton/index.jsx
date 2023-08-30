import React, { useEffect, useState } from 'react';

import style from './index.module.scss';

export const LikedButton = React.memo(({ targetId, myPokemon }) => {
  const LOCAL_KEY_MYMONSTER = 'myMonster';
  const localData = localStorage.getItem(LOCAL_KEY_MYMONSTER);
  const parsedData = JSON.parse(localData) || [];

  const initialLiked = parsedData.find(item => item && item.id === targetId)?.liked || false;
  const [isLiked, setIsLiked] = useState(initialLiked);

  useEffect(() => {
    const updateData = parsedData.map(item => {
      if (item && item.id === targetId) {
        return { ...item, liked: isLiked };
      }
      return item;
    });
    localStorage.setItem(LOCAL_KEY_MYMONSTER, JSON.stringify(updateData));
  }, [isLiked, parsedData]);

  const handleLiked = e => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
  };

  return (
    <button type="button" className={`${style.liked} ${isLiked ? style.isClicked : ''}`} onClick={handleLiked}>
      {isLiked ? '❤️' : '🤍'}
    </button>
  );
});
