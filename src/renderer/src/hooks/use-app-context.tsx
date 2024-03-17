import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useAppContext = (): AppContextProps => {
  const ctx = useContext(AppContext);
  if (ctx === null) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
};
