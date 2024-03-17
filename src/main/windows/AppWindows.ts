import { BrowserWindow } from 'electron';
import appWindow from './appWindow';

class AppWindows {
  static mainWindow: null | BrowserWindow = null;

  static createMainAppWindow(): void {
    this.mainWindow = appWindow();
  }
  static getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }
}

export default AppWindows;
