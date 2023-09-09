import React from 'react';
import style from './index.module.scss';

export const ErrorComponent = ({ errorMessage }) => {
  return (
    <div className={style.error}>
      <strong className={style.error_title}>
        앗 에러다! <br /> 다시 시도해 주세요.
      </strong>
      <p className={style.error_message}>(Error: {errorMessage})</p>
    </div>
  );
};
