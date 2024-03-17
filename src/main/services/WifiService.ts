import { app, dialog } from 'electron';
import { toFile, type QRCodeToFileOptions } from 'qrcode';
import { rename } from 'fs';
import {
  networkInterfaces,
  wifiConnections,
  wifiNetworks,
} from 'systeminformation';
import wifiPassword from 'wifi-password';
import wifi from 'node-wifi-fixes';
import AppWindows from '../windows/AppWindows';
import { join } from 'path';
import { containsEnterprise } from '../utils/app';

const notConnected = 'You are not connected to any wifi network';
const saveImage = 'save-image-status';
const failImageMessage = 'Failed to save QR code image';
import { getWifiNetworks, getWifiProfile } from '../utils/win';
wifi.init({
  iface: null,
});

class WifiService {
  static async fetchConnectedWifi(): Promise<IPCResponse> {
    try {
      const data: WifiConnectionData[] = await wifiConnections();
      const networks = (await networkInterfaces()) as NetworkInterfacesData[];
      const wifiInterface = networks.find(
        (network) => network.iface === data[0].iface
      );
      if (data.length > 0 && containsEnterprise(data[0].security)) {
        return {
          message: 'Can not share enterprise network',
          status: 'warning',
          connectedNetwork: {
            networkInterface: wifiInterface?.ifaceName ? wifiInterface : null,
            network: data.length > 0 ? data[0] : null,
            password: '',
          },
        };
      }
      const password = await wifiPassword();
      if (!password) {
        throw new Error('Failed to fetch connected wifi');
      }
      return {
        message: 'Connected wifi fetched successfully',
        status: 'success',
        connectedNetwork: {
          networkInterface: wifiInterface?.ifaceName ? wifiInterface : null,
          network: data.length > 0 ? data[0] : null,
          // WIFI:S:Abasyn Basemnt_5G;T:WPA;P:noor#000;H:false;;
          password:
            data.length > 0
              ? `WIFI:S:${data[0].ssid};T:${data[0].security};P:${password};H:false;;`
              : '',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: notConnected,
      };
    }
  }
  static async fetchAvailableWifi(): Promise<IPCResponse> {
    try {
      const networks = await wifiNetworks();
      return {
        status: 'success',
        message: 'Wifi networks fetched successfully',
        networks,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: 'Failed to fetch wifi networks',
        networks: [],
      };
    }
  }
  static connectWifi(data: ConnectQuery): void {
    console.log(data);
    const window = AppWindows.getMainWindow();
    if (!window) {
      return;
    }
    wifi.connect({ ssid: data.ssid, password: data.password }, (error) => {
      if (error) {
        console.log(error);
        window.webContents.send('connect-wifi-status', {
          status: 'error',
          message:
            'Make sure you are closer to the wifi you are trying to connect',
        } as IPCResponse);
      } else {
        window.webContents.send('connect-wifi-status', {
          status: 'success',
          message: 'Wifi connected successfully',
        } as IPCResponse);
      }
    });
  }
  static generateQRCodeAndSave(data: AppNetwork): void {
    const qrData = `WIFI:S:${data.ssid};T:${data.security};P:${data.password};H:false;;`;
    const options: QRCodeToFileOptions = {
      type: 'png',
      width: 300,
      margin: 2,
    };
    const dialogOption = {
      defaultPath: join(app.getPath('desktop'), `${data.ssid}.png`),
      title: 'Save QR code',
      filters: [{ name: 'Images', extensions: ['png'] }],
    };
    const window = AppWindows.getMainWindow();
    if (!window) {
      return;
    }

    toFile(
      data.ssid,
      [{ data: Buffer.from(qrData), mode: 'byte' }],
      options,
      (error): void => {
        if (error) {
          console.log(error);
          window.webContents.send(saveImage, {
            status: 'error',
            message: failImageMessage,
          } as IPCResponse);
          return;
        }

        dialog
          .showSaveDialog(dialogOption)
          .then(({ filePath }) => {
            if (filePath) {
              rename(data.ssid, filePath, (err) => {
                if (error) {
                  console.log(err);
                  window.webContents.send(saveImage, {
                    status: 'error',
                    message: failImageMessage,
                  } as IPCResponse);
                }
                window.webContents.send(saveImage, {
                  status: 'success',
                  message: 'QR code image saved successfully',
                } as IPCResponse);
              });
            } else {
              window.webContents.send(saveImage, {
                status: 'error',
                message: failImageMessage,
              } as IPCResponse);
            }
          })
          .catch((err) => {
            console.log(err);
            window.webContents.send(saveImage, {
              status: 'error',
              message: failImageMessage,
            } as IPCResponse);
          });
      }
    );
  }
  static async fetchStoredWifi(): Promise<IPCResponse> {
    try {
      const networks = await getWifiNetworks();
      const storedWifi: WifiProfile[] = [];
      for (const network of networks) {
        const profile = await getWifiProfile(network);
        storedWifi.push(profile);
      }
      return {
        status: 'success',
        message: 'Stored wifi networks fetched successfully',
        storedWifi,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        message: 'Failed to fetch stored wifi networks',
        storedWifi: [],
      };
    }
  }
}

export default WifiService;