import style from './index.module.scss';

export const SpritesItem = ({ spriteName, imgSrc }) => {
  const frontRegex = /^(front_)/;

  return (
    <div className={`${style.sprite_item}`}>
      <img src={`${imgSrc}`} alt={spriteName} />
      <p>{frontRegex.test(spriteName) ? '앞' : '뒤'}</p>
    </div>
  );
};
