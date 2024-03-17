import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export const fetchStoredWifi = createAsyncThunk('wifi/fetchStoredWifi', async () => {
  return window.wifi.fetchStoredWifi();
});

export const fetchStoredWifiFulfilled = (
  state: AppSliceState,
  action: PayloadAction<
    IPCResponse,
    string,
    {
      requestId: string;
    }
  >
): void => {
  const { storedWifi } = action.payload;
  console.log(storedWifi);
  state.storedWifi = storedWifi as WifiProfile[];
  state.isStoredWifiLoading = false;
};

export const fetchStoredWifiPending = (state: AppSliceState): void => {
  state.isStoredWifiLoading = true;
};
