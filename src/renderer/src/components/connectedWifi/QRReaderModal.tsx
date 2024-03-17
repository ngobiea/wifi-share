import { Dialog, Typography, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import { toggleQRScanner } from '../../store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import QRCode from 'react-qr-code';
import { AiOutlineScan } from 'react-icons/ai';

const QRReaderModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isShowQRScanner, connectedNetwork, password, isDarkMode } =
    useAppSelector((state) => state.app);

  const handleOpen = (): void => {
    dispatch(toggleQRScanner());
  };

  return (
    <Dialog
      open={isShowQRScanner}
      size='sm'
      handler={handleOpen}
      className={` ${isDarkMode ? ' bg-gray-800 text-white' : ''}`}
    >
      <CardHeader shadow={false} floated={false} className=''>
        <div
          style={{
            height: 'auto',
            margin: '0 auto',
            maxWidth: 200,
            width: '100%',
          }}
        >
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={password}
            viewBox={`0 0 256 256`}
          />
        </div>
      </CardHeader>
      <CardBody
        className={`${isDarkMode ? 'text-white' : 'text-blue-gray-900'}`}
      >
        <div className='mb-2 flex items-center justify-center'>
          <Typography className='font-medium text-center'>
            Scan QR Code to Connect to {connectedNetwork?.network?.ssid}
          </Typography>
        </div>
        <Typography
          variant='small'
          className='font-normal opacity-75 text-center'
        >
          Find the following icon in Settings {'>'} Wi-Fi {'>'} and tap to Scan
          QR Code
        </Typography>
      </CardBody>
      <CardFooter className='pt-0'>
        <AiOutlineScan className='text-4xl text-blue-gray-700 m-auto' />
      </CardFooter>
    </Dialog>
  );
};

export default QRReaderModal;
