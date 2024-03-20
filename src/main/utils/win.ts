
import { execa } from 'execa';
import { logError } from './logError';
import { v4 as uuidv4 } from 'uuid';

let currentNetwork = '';
const cmd = 'netsh';
const args = ['wlan', 'show', 'profiles'];

export const getWifiNetworks = async (): Promise<string[]> => {
  return execa(cmd, args)
    .then((res) => {
      const networks = res.stdout
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.includes('All User Profile'));
      return networks.map((network) => {
        return network.split(':')[1].trim();
      });
    })
    .catch((err) => {
      console.log('Error in getWifiNetworks');
      console.log(err);
      logError(err);
      return [];
    });
};
export const getWifiProfile = async (ssid: string): Promise<WifiProfile> => {
  return execa(cmd, ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'])
    .then((res) => {
      const profileInfo = res.stdout.split('\n').map((line) => line.trim());
      let password = '';
      let security = '';
      profileInfo.forEach((info, index) => {
        if (info.startsWith('Security key')) {
          if (profileInfo[index + 1].startsWith('Key Content')) {
            password = profileInfo[index + 1].split(':')[1].trim();
          }
        } else if (info.startsWith('Authentication')) {
          security = info.split(':')[1].trim();
        }
      });

      return { ssid, password, security, id: uuidv4() };
    })
    .catch((error) => {
      logError(error);
      if (currentNetwork !== ssid) {
        currentNetwork = ssid + ' ';
        return getWifiProfile(ssid + ' ');
      }
      currentNetwork = '';
      return {
        ssid,
        password: 'Not found',
        security: 'Not found',
        id: uuidv4(),
      };
    });
};
