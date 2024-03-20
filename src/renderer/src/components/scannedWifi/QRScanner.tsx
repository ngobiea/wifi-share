import {
  Card,
  CardFooter,
  CardHeader,
  Button,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import jsQR from 'jsqr';
import { useAppContext } from '../../hooks/use-app-context';
import { useEffect, useRef } from 'react';
import { AiOutlineScan } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setQRCode, setWebcamStatus } from '../../store/slices/appSlice';
import VideoDevices from './VideoDevices';
import { parseWifiString } from '../../utils/app';
import { TbBarcodeOff } from 'react-icons/tb';

const QRScanner = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { disableWebcam, enableWebcam, stream } = useAppContext();
  const { isLoading, qrCode, webcamStatus, isDarkMode,selectedVideoDevice } = useAppSelector(
    (state) => state.app
  );
  useEffect(() => {
    const tick = (): void => {
      if (videoRef.current?.readyState === 4) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !video) {
          return;
        }
        canvas.height = video?.videoHeight;
        canvas.width = video?.videoWidth;

        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || !video) {
          return;
        }
        ctx.drawImage(video, 0, 0, canvas?.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          console.log('Found QR code', code.data);
          console.log(parseWifiString(code.data));
          dispatch(setQRCode(code.data));
        } else {
          dispatch(setQRCode(''));
        }
      }
      requestAnimationFrame(tick);
    };
    if (!isLoading) {
      requestAnimationFrame(tick);
    }
  }, [isLoading, videoRef]);
  useEffect(() => {
    if (stream) {
      videoRef.current!.srcObject = stream;
    } else {
      videoRef.current!.srcObject = null;
    }
  }, [stream]);
  useEffect(() => {
    dispatch(setWebcamStatus(''));
  }, []);
  return (
    <Card
      className={`relative h-[35rem] w-full max-w-[58rem] m-auto overflow-hidden mt-10  ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }`}
    >
      <div className='w-72 relative top-1 left-1 '>
        <VideoDevices />
      </div>
      <CardHeader
        floated={false}
        className='h-5/6 m-auto w-full max-w-[40rem] mt-3 relative'
        color='blue-gray'
      >
        {stream && (
          <Typography className=' absolute left-1/3 top-2 text-white'>
            Display QR code in front of the camera
          </Typography>
        )}
        {isLoading && (
          <p className='text-center text-gray-500 text-xl'>Loading video...</p>
        )}
        <video ref={videoRef} autoPlay={true} className='' muted />

        <canvas ref={canvasRef} className='hidden' />
      </CardHeader>
      <CardBody>
        {!isLoading && !qrCode && stream && (
          <p className='text-center text-gray-500 text-xl'>
            No QR code detected
          </p>
        )}
        {''}
        {webcamStatus && (
          <p className='text-center text-gray-500 text-xl'>{webcamStatus}</p>
        )}
      </CardBody>
      <CardFooter className=' flex justify-center'>
        <Button
          color='blue-gray'
          className='flex flex-col items-center gap-1 w-48'
          onClick={() => {
            if (videoRef.current?.srcObject === null) {
              enableWebcam({deviceId: selectedVideoDevice?.deviceId});
            } else {
              disableWebcam();
            }
          }}
        >
          {stream === null ? (
            <AiOutlineScan size={20} />
          ) : (
            <TbBarcodeOff size={20} />
          )}
          {stream === null ? 'Scan QR Code' : 'Stop Scanning'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRScanner;
