import style from './index.module.scss';

export const SpritesImage = ({ spriteName, imgSrc, hoverStatus }) => {
  const frontRegex = /^(front_)/;

  return (
    <div className={`${style.sprite_item} ${hoverStatus}`}>
      <img src={`${imgSrc}`} alt={spriteName} />
      <p>{frontRegex.test(spriteName) ? '앞' : '뒤'}</p>
    </div>
  );
};
