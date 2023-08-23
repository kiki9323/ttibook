import React from 'react';

export const ErrorComponent = ({ errorMessage }) => {
  return (
    <div>
      <strong>
        앗 에러다! <br /> 다시 시도해 주세요.
      </strong>
      <p>(Error: {errorMessage})</p>
    </div>
  );
};
