import { createContext, useMemo, useState } from 'react';
import { setWebcamStatus } from '../store/slices/appSlice';
import { useAppDispatch } from '../store/hooks';
interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextProps | null>(null);

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const enableWebcam = async ({
    deviceId,
  }: {
    deviceId: string;
  }): Promise<void> => {
    try {
      if (stream) {
        disableWebcam();
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
        audio: false,
      });
      setStream(newStream);
    } catch (error) {
      dispatch(
        setWebcamStatus(
          'Failed to access webcam. Please check your webcam settings.'
        )
      );
      console.log(error);
    }
  };
  const disableWebcam = (): void => {
    console.log('Disabling webcam');
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  };
  const value = useMemo(
    () => ({
      stream,
      enableWebcam,
      disableWebcam,
    }),
    [stream, enableWebcam, disableWebcam]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
