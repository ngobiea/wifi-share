declare module 'node-wifi-fixes' {
  interface WiFiNetwork {
    ssid: string;
    bssid?: string;
    mac?: string; // equals to bssid (for retrocompatibility)
    channel: number;
    frequency: number; // in MHz
    signal_level: number; // in dB
    quality: number; // same as signal level but in %
    security: string; // format depending on locale for open networks in Windows
    security_flags: string[]; // encryption protocols (format currently depending of the OS)
    mode?: string; // network mode like Infra (format currently depending of the OS)
  }

  interface InitConfig {
    debug?: boolean;
    iface?: string | null; // network interface, choose a random wifi interface if set to null
  }

  interface ConnectionOpts {
    ssid: string;
    password: string;
  }

  interface DeletionOpts {
    ssid: string;
  }

  /**
   * Initialize wifi module
   * Absolutely necessary even to set interface to null
   */
  function init(options: InitConfig): void;

  /**
   * Scan networks
   */
  function scan(): Promise<WiFiNetwork[]>;
  function scan(
    cb: (error: Error | null, networks: WiFiNetwork[]) => void
  ): void;

  /**
   * Connect to a network
   * on windows, the callback is called even if the connection failed due to netsh limitations
   * if your software may work on windows, you should use `wifi.getCurrentConnections` to check if the connection succeeded
   */
  function connect(opts: ConnectionOpts): Promise<void>;
  function connect(opts: ConnectionOpts, cb: (error:Error) => void): void;

  /**
   * Disconnect from a network
   * not available on all os for now
   */
  function disconnect(): Promise<void>;
  function disconnect(cb: (error: Error | null) => void): void;

  /**
   * List the current wifi connections
   */
  function getCurrentConnections(): Promise<WiFiNetwork[]>;
  function getCurrentConnections(
    cb: (error: Error | null, currentConnections: WiFiNetwork[]) => void
  ): void;

  /**
   * Delete a saved network
   * not available on all os for now
   */
  function deleteConnection(
    opts: DeletionOpts,
    cb: (error: Error | null) => void
  ): void;
  function deleteConnection(opts: DeletionOpts): Promise<void>;
}
