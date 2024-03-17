import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export const fetchAvailableWifi = createAsyncThunk('wifi/fetchAvailableWifi', async () => {
  return window.wifi.fetchAvailableWifi();
});

export const fetchAvailableWifiFulfilled = (
  state: AppSliceState,
  action: PayloadAction<
    IPCResponse,
    string,
    {
      requestId: string;
    }
  >
): void => {
  const { networks } = action.payload;
  state.availableWifi = networks as WifiNetworkData[];
};
