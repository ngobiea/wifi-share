import { Select, Option } from '@material-tailwind/react';
import { useAppSelector } from '../../store/hooks';
import { setDefaultVideoDevice } from '../../store/slices/appSlice';

const VideoDevices = (): JSX.Element => {
  const { videoDevices, selectedVideoDevice, isDarkMode } = useAppSelector(
    (state) => state.app
  );

  return (
    <Select
      color='blue-gray'
      className={`${
        isDarkMode ? ' text-white outline-blue-gray-700 outline-1' : ''
      }`}
      label='Select Camera'
      value={selectedVideoDevice?.deviceId as string}
      onChange={(value) => {
        setDefaultVideoDevice(value as string);
      }}
    >
      {videoDevices.map((device) => {
        return (
          <Option key={device.deviceId} value={device.deviceId} className={``}>
            {device.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default VideoDevices;
