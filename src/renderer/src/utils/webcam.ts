export const getDevices = async (): Promise<MediaDeviceInfo[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'videoinput');
};

export const getDefaultVideoDevice = async (): Promise<MediaDeviceInfo> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoOutputDevices = devices.filter((device) => device.kind === 'videoinput');
  return videoOutputDevices[0];
};

export const onChangeDevice = async (deviceId: string): Promise<MediaStream> => {
  const constraints = {
    video: {
      deviceId,
    },
  };
  return navigator.mediaDevices.getUserMedia(constraints);
};
