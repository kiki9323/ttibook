import React from 'react';
import style from './index.module.scss';

export const LoadingComponent = () => {
  return (
    <div className={style.loading}>
      <strong className={style.loading_title}>Loading...</strong>
      <p className={style.loading_text}>?</p>
    </div>
  );
};
