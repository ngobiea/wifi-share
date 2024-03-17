import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useAppSelector } from '../../store/hooks';
import { IoWifi } from 'react-icons/io5';
import { MdOutlineWifi1Bar, MdOutlineWifi2Bar, MdOutlineWifi } from 'react-icons/md';
import { BsQrCodeScan } from 'react-icons/bs';
import { handleShowQRCode } from './utils/connectedWifiDetails';
import { containsEnterprise } from '../../utils/app';

const seventyFive = 75;
const fifty = 50;
const twentyFive = 25;
const ConnectedWifiDetails = (): JSX.Element => {
  const { connectedNetwork, isDarkMode } = useAppSelector((state) => state.app);

  let wifiIcon = <IoWifi className='text-white h-32 w-32' />;
  let quality = 'Excellent';
  let frequency = 0;

  if (connectedNetwork?.network) {
    frequency = Math.floor(connectedNetwork.network.frequency / 1000);
  }
  if (
    connectedNetwork?.network &&
    connectedNetwork?.network?.quality < seventyFive
  ) {
    wifiIcon = <MdOutlineWifi className='text-white h-32 w-32' />;
    quality = 'Good';
  } else if (
    connectedNetwork?.network &&
    connectedNetwork?.network?.quality < fifty
  ) {
    wifiIcon = <MdOutlineWifi2Bar className='text-white h-32 w-32' />;
    quality = 'Average';
  } else if (
    connectedNetwork?.network &&
    connectedNetwork?.network?.quality < twentyFive
  ) {
    wifiIcon = <MdOutlineWifi1Bar className='text-white h-32 w-32' />;
    quality = 'Poor';
  }

  return (
    <Card
      className={`relative h-[35rem] w-full max-w-[58rem]  justify-center m-auto overflow-hidden mt-10 text-center  ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }`}
    >
      <CardHeader
        floated={false}
        color='blue-gray'
        className='flex flex-col items-center h-2/6 '
      >
        {wifiIcon}
        <Typography variant='h4' className='mt-3 text-white'>
          {connectedNetwork?.network?.ssid ?? ''}
        </Typography>
      </CardHeader>
      <CardBody
        className={`h-1/2 ${isDarkMode ? 'text-white' : 'text-blue-gray-700'} `}
      >
        <div className='grid grid-cols-3 gap-8'>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Signal Strength</Typography>
            <Typography>{quality}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Frequency</Typography>
            <Typography>{`${frequency} GHz`}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Security</Typography>
            <Typography>{connectedNetwork?.network?.security ?? ''}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>IPV4 Address</Typography>
            <Typography>
              {connectedNetwork?.networkInterface?.ip4 ?? ''}
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Mac Address</Typography>
            <Typography>
              {connectedNetwork?.networkInterface?.mac ?? ''}
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>IPV6 Address</Typography>
            <Typography>
              {connectedNetwork?.networkInterface?.ip6 ?? ''}
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Link Speed (Receive/Transmit)</Typography>
            <Typography>
              {connectedNetwork?.networkInterface?.speed}/
              {connectedNetwork?.network?.txRate ?? ''}
            </Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Model</Typography>
            <Typography>{connectedNetwork?.network?.model ?? ''}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Type</Typography>
            <Typography>{connectedNetwork?.network?.type ?? ''}</Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className='flex justify-center'>
        {!containsEnterprise(connectedNetwork?.network?.security ?? '') ? (
          <Button
            color='blue-gray'
            className='flex flex-col items-center gap-1 w-48'
            onClick={handleShowQRCode}
          >
            <BsQrCodeScan className='h-5 w-5' />
            Share
          </Button>
        ) : (
          <Alert color='amber' className='flex justify-center'>
            Can not share enterprise network
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};
export default ConnectedWifiDetails;
