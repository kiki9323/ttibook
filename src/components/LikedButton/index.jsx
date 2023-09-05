import React, { useEffect, useState } from 'react';

import { ReactComponent as HeartFullIco } from '../../assets/images/heart-full-ico.svg';
import { ReactComponent as HeartIco } from '../../assets/images/heart-ico.svg';
import style from './index.module.scss';

export const LikedButton = React.memo(({ targetId }) => {
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
  }, [targetId, isLiked, parsedData]);

  const handleLiked = e => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
  };

  return (
    <button type="button" className={`${style.liked} ${isLiked ? style.isClicked : ''}`} onClick={handleLiked}>
      {isLiked ? <HeartIco width="18px" height="18px" /> : <HeartFullIco width="18px" height="18px" />}
    </button>
  );
});

LikedButton.displayName = 'LikedButton';
