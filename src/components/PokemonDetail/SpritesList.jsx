import React from 'react';
import { SpritesImage } from './SpritesImage';
import { rearrangeStrings } from '@/utils/utils';
import style from './index.module.scss';

export const SpritesList = ({ sprites, hoverShaking, hoverFading }) => {
  const animatedImg = sprites.versions[`generation-v`][`black-white`].animated;
  const defaultSprites = Object.entries(animatedImg).sort(rearrangeStrings('front_', 'back_'));
  const regex = /_default$/;

  return (
    <div className={style.sprite_list}>
      {defaultSprites.map(([key, imgSrc], idx) => {
        if (!imgSrc || !regex.test(key)) return null;
        return (
          <SpritesImage key={idx} spriteName={key} imgSrc={imgSrc} hoverStatus={`${hoverShaking} ${hoverFading}`} />
        );
      })}
    </div>
  );
};
