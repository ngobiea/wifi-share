interface NetworkInterfacesData {
  iface: string;
  ifaceName: string;
  default: boolean;
  ip4: string;
  ip4subnet: string;
  ip6: string;
  ip6subnet: string;
  mac: string;
  internal: boolean;
  virtual: boolean;
  operstate: string;
  type: string;
  duplex: string;
  mtu: number | null;
  speed: number | null;
  dhcp: boolean;
  dnsSuffix: string;
  ieee8021xAuth: string;
  ieee8021xState: string;
  carrierChanges: number;
}

interface WifiNetworkData {
  ssid: string;
  bssid: string;
  mode: string;
  channel: number;
  frequency: number;
  signalLevel: number;
  quality: number;
  security: string[];
  wpaFlags: string[];
  rsnFlags: string[];
  id; string;
}

interface WifiConnectionData {
  id: string;
  iface: string;
  model: string;
  ssid: string;
  bssid: string;
  channel: number;
  frequency: number;
  type: string;
  security: string;
  signalLevel: number;
  quality: number;
  txRate: number;
}

interface WifiProfile {
  id: string;
  ssid: string;
  password: string;
  security: string;
}
