import icon from '../../../assets/icon.png';

export const codeOptions: Option[] = [
  {
    id: 'WPA3',
    name: 'WPA3',
  },
  {
    id: 'WPA2',
    name: 'WPA2',
  },
  {
    id: 'WPA',
    name: 'WPA',
  },
  {
    id: 'WEP',
    name: 'WEP',
  },
  {
    id: 'None',
    name: 'None',
  },
];

window.wifi.saveImageStatus((response: IPCResponse) => {
  const { status } = response;
  if (status === 'success') {
    new Notification('QR code saved', {
      body: 'QR code saved to desktop',
      icon,
    });
  } else {
    new Notification('QR code save failed', {
      body: 'Failed to save QR code',
      icon,
    });
  }
});
