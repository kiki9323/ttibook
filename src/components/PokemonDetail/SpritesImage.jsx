import style from './index.module.scss';

export const SpritesImage = ({ spriteName, imgSrc }) => {
  const frontRegex = /^(front_)/;
  return (
    <li key={spriteName} className={style.sprite_item}>
      <img src={`${imgSrc}`} alt={spriteName} />
      <p>{frontRegex.test(spriteName) ? '앞' : '뒤'}</p>
    </li>
  );
};
