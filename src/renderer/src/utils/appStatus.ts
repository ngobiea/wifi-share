const interval = 3000;
import { store } from '../store';
import { fetchConnectedWifi } from '../store/thunks/fetchConnectedWifi';
import { fetchAvailableWifi } from '../store/thunks/fetchAvailableWifi';
import { setDisconnectedWifi, toggleWelcome } from '../store/slices/appSlice';
export const appStatus = (): void => {
  setInterval(() => {
    const { tab } = store.getState().app;
    if (navigator.onLine) {
      if (tab === 'Wi-Fi Share') {
        store.dispatch(fetchConnectedWifi());
      }
    } else {
      store.dispatch(setDisconnectedWifi());
    }
    if (tab === 'Wi-Fi Scan') {
      store.dispatch(fetchAvailableWifi());
    }
  }, interval);
};

export const handleShowWelcome = () => {
  const count = localStorage.getItem('welcomeCount');
  if (!count) {
      store.dispatch(toggleWelcome());
    localStorage.setItem('welcomeCount', '0');
  }
  else{
    const currentCount = parseInt(count as string);
    if (currentCount < 10) {
      localStorage.setItem('welcomeCount', (currentCount + 1).toString());
    } else {
      store.dispatch(toggleWelcome());
      localStorage.setItem('welcomeCount', '0');
    }
  }
};