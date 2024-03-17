import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export const fetchConnectedWifi = createAsyncThunk('wifi/fetchConnectedWifi', async () => {
  return window.wifi.fetchConnectedWifi();
});

export const fetchConnectedWifiFulfilled = (
  state: AppSliceState,
  action: PayloadAction<
    IPCResponse,
    string,
    {
      requestId: string;
    }
  >
): void => {
  const { connectedNetwork } = action.payload;
  if (connectedNetwork) {
    state.connectedNetwork = connectedNetwork;
    state.isConnected = true;
    state.password = connectedNetwork.password;
  } else {
    state.connectedNetwork = null;
    state.isConnected = false;
  }
};
