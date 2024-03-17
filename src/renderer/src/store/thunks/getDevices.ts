import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export const getDevices = createAsyncThunk('app/getDevices', async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevice = devices.filter((device) => device.kind === 'videoinput');
  return videoDevice.map((device) => {
    return {
      deviceId: device.deviceId,
      kind: device.kind,
      label: device.label,
    };
  });
});

export const getDevicesFulfilled = (
  state: AppSliceState,
  action: PayloadAction<
    VideoDevice[],
    string,
    {
      requestId: string;
    }
  >
): void => {
  const videoDevices = action.payload;
  state.videoDevices = videoDevices;
  state.selectedVideoDevice = {
    deviceId: videoDevices[0].deviceId,
    kind: videoDevices[0].kind,
    label: videoDevices[0].label,
  };
};
