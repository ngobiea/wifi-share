import { ipcMain, clipboard } from 'electron';
import WifiService from '../services/WifiService';

const handleWifi = (): void => {
  ipcMain.handle('fetch-connected-wifi', async () => {
    return WifiService.fetchConnectedWifi();
  });
  ipcMain.handle('fetch-available-wifi', async () => {
    return WifiService.fetchAvailableWifi();
  });
  ipcMain.on('copy-password', (_, password: string) => {
    clipboard.writeText(password);
  });
  ipcMain.on('connect-wifi', async (_, data: ConnectQuery) => {
    WifiService.connectWifi(data);
  });
  ipcMain.on('save-qrcode-image', (_, data: AppNetwork) => {
    WifiService.generateQRCodeAndSave(data);
  });
  ipcMain.handle('fetch-stored-wifi', async () => {
    return WifiService.fetchStoredWifi();
  });
};

export default handleWifi;
