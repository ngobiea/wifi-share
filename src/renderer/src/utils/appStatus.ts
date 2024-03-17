const interval = 3000;
import { store } from '../store';
import { fetchConnectedWifi } from '../store/thunks/fetchConnectedWifi';
import { fetchAvailableWifi } from '../store/thunks/fetchAvailableWifi';
import { setDisconnectedWifi } from '../store/slices/appSlice';
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
