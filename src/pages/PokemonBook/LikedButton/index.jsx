import { IconHeart, IconHeartFull } from '@/assets/svg';
import React, { useState } from 'react';

import style from './index.module.scss';

export const LikedButton = React.memo(({ pokemon, onLiked }) => {

  const [isLiked, setIsLiked] = useState(pokemon.liked);

  const handleLiked = e => {
    e.stopPropagation();
    setIsLiked(prev => !prev)
    onLiked(pokemon.id)
  };

  return (
    <button type="button" className={`${style.liked} ${isLiked ? style.isClicked : ''}`} onClick={handleLiked}>
      {isLiked ? <IconHeart width="18px" height="18px" /> : <IconHeartFull width="18px" height="18px" />}
    </button>
  );
});

LikedButton.displayName = 'LikedButton';
