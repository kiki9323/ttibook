import React from "react";

export const ErrorComponent = ({ message }) => {
  return (
    <div>
      <p>Error: {message}</p>
    </div>
  );
};
