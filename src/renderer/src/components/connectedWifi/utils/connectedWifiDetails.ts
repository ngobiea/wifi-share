import { store } from '../../../store';
import { toggleQRScanner } from '../../../store/slices/appSlice';

export const handleShowQRCode = (): void => {
  store.dispatch(toggleQRScanner());
};
