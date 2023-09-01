import React from 'react';
import style from './index.module.scss';

export const PokemonAbilites = ({ abilities, habitat, capture_rate, genus, color }) => {
  return (
    <>
      <div className={style.info_row}>
        <dt>능력</dt>
        <dd>
          {abilities.map((item, idx) => (
            <span key={idx} className={style.info_ability}>
              {item.ability.name}
            </span>
          ))}
        </dd>
      </div>
      <div className={style.info_row}>
        <dt>서식지</dt>
        <dd>{habitat?.name ?? '(알 수 없음)'}</dd>
      </div>
      <div className={style.info_row}>
        <dt>포획률</dt>
        <dd>{capture_rate} / 255</dd>
      </div>
      <div className={style.info_row}>
        <dt>분류</dt>
        <dd>{genus}</dd>
      </div>
      <div className={style.info_row}>
        <dt>상징 색</dt>
        <dd>
          <span className={style.info_color} style={{ backgroundColor: `${color.name}` }}></span>
          {color.name}
        </dd>
      </div>
    </>
  );
};
