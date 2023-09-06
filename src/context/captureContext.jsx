import { createContext, useState } from 'react';

export const CaptureContext = createContext();
export const CaptureProvider = ({ children }) => {
  const [isCapture, setIsCaptured] = useState(false);

  return <CaptureContext.Provider value={{ isCapture, setIsCaptured }}>{children}</CaptureContext.Provider>;
};
