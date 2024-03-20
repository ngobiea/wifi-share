import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchConnectedWifi,
  fetchConnectedWifiFulfilled,
} from '../thunks/fetchConnectedWifi';
import { getDevices, getDevicesFulfilled } from '../thunks/getDevices';
import { getPreferredColorScheme, parseWifiString } from '../../utils/app';
import {
  fetchAvailableWifi,
  fetchAvailableWifiFulfilled,
} from '../thunks/fetchAvailableWifi';
import {
  fetchStoredWifi,
  fetchStoredWifiFulfilled,
  fetchStoredWifiPending,
} from '../thunks/fetchStoredWifi';
// const preferredColorScheme =
// console.log(preferredColorScheme);
const initialState: AppSliceState = {
  tab: 'Wi-Fi Share',
  openSidenav: true,
  fixedNavbar: false,
  availableWifi: [],
  connectedWifi: null,
  isConnected: false,
  connectedNetwork: null,
  isShowQRScanner: false,
  isShowWrongCode: false,
  isShowWelcome: false,
  password: '',
  isLoading: false,
  qrCode: '',
  videoDevices: [],
  selectedVideoDevice: {
    deviceId: '',
    kind: '',
    label: '',
  },
  scanStatus: '',
  isShowConnect: false,
  webcamStatus: '',
  storedWifi: [],
  currentStoredWifi: null,
  isStoredWifiLoading: false,
  isDarkMode: getPreferredColorScheme() === 'dark' ? true : false,
};

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    changeTab: (state, action: PayloadAction<tab>) => {
      state.tab = action.payload;
    },
    setOpenSidenav: (state, action: PayloadAction<boolean>) => {
      state.openSidenav = action.payload;
    },
    setFixedNavbar: (state, action: PayloadAction<boolean>) => {
      state.fixedNavbar = action.payload;
    },
    toggleQRScanner: (state) => {
      state.isShowQRScanner = !state.isShowQRScanner;
    },
    toggleConnect: (state) => {
      state.isShowConnect = !state.isShowConnect;
    },
    toggleWrongCode: (state) => {
      state.isShowWrongCode = !state.isShowWrongCode;
    },
    setDisconnectedWifi: (state) => {
      state.connectedNetwork = null;
      state.isConnected = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setQRCode: (state, action: PayloadAction<string>) => {
      state.qrCode = action.payload;
      if (action.payload !== '') {
        const { P, S, T } = parseWifiString(action.payload);
        if (P && S && T) {
          state.connectedWifi = parseWifiString(action.payload);
          state.isShowConnect = true;
        } else {
          state.isShowWrongCode = true;
        }
      }
      if (action.payload === '' && state.tab === 'Open QR Image') {
        state.scanStatus = 'No QR code found. Please try again.';
      }
    },
    setDefaultVideoDevice: (state, action: PayloadAction<string>) => {
      const selectedDevice = state.videoDevices.find(
        (device) => device.deviceId === action.payload
      );
      state.selectedVideoDevice = {
        deviceId: selectedDevice?.deviceId as string,
        kind: selectedDevice?.kind as string,
        label: selectedDevice?.label as string,
      };
    },
    setWebcamStatus: (state, action: PayloadAction<string>) => {
      state.webcamStatus = action.payload;
    },
    setCurrentStoredWifi: (
      state,
      action: PayloadAction<WifiProfile | null>
    ) => {
      state.currentStoredWifi = action.payload;
    },
    setScanStatus: (state, action: PayloadAction<string>) => {
      state.scanStatus = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleWelcome: (state) => {
      state.isShowWelcome = !state.isShowWelcome;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnectedWifi.fulfilled, fetchConnectedWifiFulfilled);
    builder.addCase(getDevices.fulfilled, getDevicesFulfilled);
    builder.addCase(fetchAvailableWifi.fulfilled, fetchAvailableWifiFulfilled);
    builder.addCase(fetchStoredWifi.fulfilled, fetchStoredWifiFulfilled);
    builder.addCase(fetchStoredWifi.pending, fetchStoredWifiPending);
  },
});

export const {
  changeTab,
  setFixedNavbar,
  setOpenSidenav,
  toggleQRScanner,
  setDisconnectedWifi,
  setIsLoading,
  setQRCode,
  setDefaultVideoDevice,
  toggleConnect,
  toggleWrongCode,
  setWebcamStatus,
  setCurrentStoredWifi,
  setScanStatus,
  toggleDarkMode,
  toggleWelcome,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
