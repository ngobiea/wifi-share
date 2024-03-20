import { Card, CardBody, Typography } from '@material-tailwind/react';
import { TbPointFilled } from 'react-icons/tb';
import { useAppSelector } from '../../store/hooks';
const ReleaseNote = (): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <Card
      className={`mt-6 w-full ${isDarkMode ? ' bg-gray-700 text-white' : ''}`}
    >
      <CardBody>
        <Typography variant='h5' className='mb-2'>
          Release Version 1.0.0-beta.1
        </Typography>

        <ul>
          <li className=' font-bold'>Initial Release</li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            Current WiFi Network Information
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            WiFi Network Sharing
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            WiFi QR Code Scanning
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            Auto-Connect to WiFi Network
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            Scan Available WiFi Networks
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            WiFi QR Code Generation
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            WiFi QR Code Importing
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            WiFi QR Code Exporting
          </li>
          <li>
            <TbPointFilled className='inline-flex mr-2' />
            Retrieved Stored WiFi Networks
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};

export default ReleaseNote;
