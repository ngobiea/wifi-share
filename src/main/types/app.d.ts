interface Window {
  wifi: {
    connectWifi: (data: ConnectQuery) => void;
    onConnection: (callback: (status: IPCResponse) => void) => void;
    fetchConnectedWifi: () => Promise<IPCResponse>;
    copyPassword: (password: string) => void;
    saveQRCodeImage: (data: AppNetwork) => void;
    saveImageStatus: (callback: (status: IPCResponse) => void) => void;
    fetchAvailableWifi: () => Promise<IPCResponse>;
    fetchStoredWifi: () => Promise<IPCResponse>;
  };
}
interface WifiDataType {
  S: string;
  T: string;
  P: string | null;
  H: boolean;
  [key: string]: string | boolean;
}
type tab =
  | 'Wi-Fi Share'
  | 'Wi-Fi Scan'
  | 'Create QR Image'
  | 'Open QR Image'
  | 'Stored Wi-Fi'
  | 'About';

interface AppNetwork {
  ssid: string;
  password: string;
  security: string;
}

interface IPCResponse {
  status: 'success' | 'error' | 'warning';
  message: string;
  networks?: WifiNetworkData[];
  connectedNetwork?: NetworkProperties;
  storedWifi?: WifiProfile[];
}
interface NetworkProperties {
  networkInterface: NetworkInterfacesData | null;
  network: WifiConnectionData | null;
  password: string;
}

interface ConnectQuery {
  ssid: string;
  password: string;
}

interface Option {
  id: string;
  name: string;
}

interface AppSliceState {
  tab: tab;
  openSidenav: boolean;
  fixedNavbar: boolean;
  availableWifi: WifiNetworkData[];
  connectedWifi: WifiDataType | null;
  isConnected: boolean;
  connectedNetwork: NetworkProperties | null;
  isShowQRScanner: boolean;
  isShowWrongCode: boolean;
  isShowWelcome: boolean;
  password: string;
  isLoading: boolean;
  qrCode: string;
  videoDevices: VideoDevice[];
  selectedVideoDevice: VideoDevice | null;
  scanStatus: string;
  isShowConnect: boolean;
  webcamStatus: string;
  storedWifi: WifiProfile[];
  currentStoredWifi: WifiProfile | null;
  isStoredWifiLoading: boolean;
  isDarkMode: boolean;
}

interface AppContextProps {
  stream: MediaStream | null;
  enableWebcam: ({ deviceId: string }) => Promise<void>;
  disableWebcam: () => void;
}

interface VideoDevice {
  deviceId: string;
  kind: string;
  label: string;
}

declare module '*.png';
declare module '*.ico';
