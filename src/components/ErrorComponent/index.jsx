import React from 'react';

export const ErrorComponent = ({ message }) => {
  return (
    <div>
      <strong>Error: {message}</strong>
      <p>앗 에러다! 다시 시도해 주세요.</p>
    </div>
  );
};
