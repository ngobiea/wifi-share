import { contextBridge, ipcRenderer } from 'electron';


// Custom APIs for renderer
const wifi = {
  connectWifi: (data: ConnectQuery): void =>
    ipcRenderer.send('connect-wifi', data),
  onConnection: (callback: (status: IPCResponse) => void): void => {
    ipcRenderer.on('connect-wifi-status', (_, status) => callback(status));
  },
  fetchConnectedWifi: (): Promise<IPCResponse> =>
    ipcRenderer.invoke('fetch-connected-wifi'),

  copyPassword: (password: string): void => {
    ipcRenderer.send('copy-password', password);
  },
  saveQRCodeImage: (data: AppNetwork): void => {
    ipcRenderer.send('save-qrcode-image', data);
  },
  saveImageStatus: (callback: (status: IPCResponse) => void): void => {
    ipcRenderer.on('save-image-status', (_, status) => callback(status));
  },
  fetchAvailableWifi: (): Promise<IPCResponse> =>
    ipcRenderer.invoke('fetch-available-wifi'),

  fetchStoredWifi: (): Promise<IPCResponse> =>
    ipcRenderer.invoke('fetch-stored-wifi'),
};

try {
  contextBridge.exposeInMainWorld('wifi', wifi);
} catch (error) {
  console.error(error);
}
