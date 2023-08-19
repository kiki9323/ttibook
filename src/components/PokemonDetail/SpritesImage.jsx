import style from './index.module.scss';

export const SpritesImage = ({ spriteName, imgSrc }) => {
  return (
    <li key={spriteName} className={style.sprite_item}>
      <img src={`${imgSrc}`} alt={spriteName} />
    </li>
  );
};
