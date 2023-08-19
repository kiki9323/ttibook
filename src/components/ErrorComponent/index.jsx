import React from "react";

export const ErrorComponent = ({ message }) => {
  return (
    <div>
      <p>Error: {message}</p>
      {/* 여기에 에러 화면 또는 추가 정보를 표시할 수 있습니다. */}
    </div>
  );
};
