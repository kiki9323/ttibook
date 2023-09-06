import { SpritesImage } from './SpritesImage';
import { rearrangeStrings } from '@/utils/utils';
import style from './index.module.scss';

export const SpritesList = ({ sprites, hoverShaking, hoverFading }) => {
  const defaultImg = Object.entries(sprites).sort(rearrangeStrings('front_', 'back_'));

  const animatedImg = sprites.versions[`generation-v`][`black-white`].animated;
  const animatedSprites = Object.entries(animatedImg).sort(rearrangeStrings('front_', 'back_'));

  const regex = /_default$/;

  const defaultMap = new Map(defaultImg);
  const finalSprites = animatedSprites.map(([key, imgSrc]) => {
    if (imgSrc === null && defaultMap.has(key)) {
      return [key, defaultMap.get(key)];
    }
    return [key, imgSrc];
  });

  return (
    <div className={style.sprite_list}>
      {finalSprites.map(([key, imgSrc], idx) => {
        if (!imgSrc || !regex.test(key)) return null;
        return (
          <SpritesImage key={idx} spriteName={key} imgSrc={imgSrc} hoverStatus={`${hoverShaking} ${hoverFading}`} />
        );
      })}
    </div>
  );
};
