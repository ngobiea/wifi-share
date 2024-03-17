import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { BiWifiOff } from 'react-icons/bi';
import { useAppSelector } from '../../store/hooks';

const NotConnectedError = (): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <Card
      className={`relative h-[35rem] w-full max-w-[48rem]  justify-center m-auto overflow-hidden mt-10 text-center  ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }`}
    >
      <CardHeader
        color='blue-gray'
        className='flex flex-col items-center h-2/6 '
      >
        <BiWifiOff className='text-white h-96 w-96' />
      </CardHeader>
      <CardBody
        className={`${isDarkMode ? 'text-white' : 'text-blue-gray-700'}`}
      >
        <Typography variant='h1' className='mb-2'>
          Disconnected
        </Typography>
      </CardBody>
    </Card>
  );
};

export default NotConnectedError;
