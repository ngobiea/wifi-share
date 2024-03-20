import { Card, CardBody, Typography } from '@material-tailwind/react';
import { FaRegHandPointRight } from 'react-icons/fa';
import { useAppSelector } from '../../store/hooks';
const Features = (): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <Card
      className={`mt-6 w-full ${isDarkMode ? ' bg-gray-700 text-white' : ''}`}
    >
      <CardBody>
        <Typography variant='h5' className='mb-2'>
          Features
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          Current WiFi Network Information
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          WiFi Network Sharing
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          WiFi QR Code Scanning
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          Auto-Connect to WiFi Network
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          Scan Available WiFi Networks
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          WiFi QR Code Generation
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          WiFi QR Code Importing
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          WiFi QR Code Exporting
        </Typography>
        <Typography>
          <FaRegHandPointRight className='inline-flex mr-2' />
          Retrieved Stored WiFi Networks
        </Typography>
      </CardBody>
    </Card>
  );
};

export default Features;
