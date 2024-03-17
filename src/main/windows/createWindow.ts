import AppWindows from './AppWindows';
import handleWifi from '../ipc/handleWifi';
async function createWindow(): Promise<void> {
  AppWindows.createMainAppWindow();
  handleWifi();
}

export { createWindow };
