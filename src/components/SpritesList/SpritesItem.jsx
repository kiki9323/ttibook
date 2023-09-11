import style from './index.module.scss';

export const SpritesItem = ({ spriteName, imgSrc }) => {
  const frontRegex = /^(front_)/;

  return (
    <div className={style.sprite_item}>
      <div className={`${style.sprite_img}`}>
        <img src={`${imgSrc}`} alt={spriteName} />
      </div>
      <p>{frontRegex.test(spriteName) ? '앞' : '뒤'}</p>
    </div>
  );
};
