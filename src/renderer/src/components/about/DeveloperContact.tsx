import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  CardHeader,
  Tooltip,
} from '@material-tailwind/react';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { useAppSelector } from '../../store/hooks';

const DeveloperContact = (): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);
  return (
    <Card
      className={`mt-6 w-full ${isDarkMode ? ' bg-gray-700 text-white' : ''}`}
    >
      <CardBody>
        <Typography variant='h5' className='mb-2'>
          Developer Contact
        </Typography>
        <Card
          className={`mt-6 w-96 m-auto ${
            isDarkMode ? ' bg-gray-800 text-white' : ' bg-gray-100'
          }`}
        >
          <CardHeader floated={false} className='h-80'>
            <img
              src='https://avatars.githubusercontent.com/u/70290199?v=4'
              alt='profile-picture'
            />
          </CardHeader>
          <CardBody
            className={`text-center ${
              isDarkMode ? 'text-white' : 'text-blue-gray-700'
            }`}
          >
            <Typography variant='h4' className='mb-2'>
              Augustine Foday Ngobie
            </Typography>
            <Typography className='font-medium' >
              Full Stack Software Engineer & Developer
            </Typography>
          </CardBody>
          <CardFooter className='flex justify-center gap-7 pt-2'>
            <Tooltip content='Gmail'>
              <a
                href='mailto:ngobiea@gmail.com'
                className='text-blue-500 inline-flex'
                target='_blank'
                rel='noreferrer'
              >
                <BiLogoGmail className='h-4 w-4 self-center mr-1' />
              </a>
            </Tooltip>
            <Tooltip content='LinkedIn'>
              <a
                href='https://www.linkedin.com/in/augustine-foday-ngobie-569723294/'
                className='text-blue-500 inline-flex'
                target='_blank'
                rel='noreferrer'
              >
                <FaLinkedin className='h-4 w-4 self-center mr-1' />
              </a>
            </Tooltip>
            <Tooltip content='Whatsapp'>
              <a
                href='https://wa.me/+923705514270'
                className='text-blue-500 inline-flex'
                target='_blank'
                rel='noreferrer'
              >
                <FaWhatsapp className='h-4 w-4 self-center mr-1' />
              </a>
            </Tooltip>
            <Tooltip content='Github'>
              <a
                href='https://github.com/ngobiea'
                className='text-blue-500 inline-flex'
                target='_blank'
                rel='noreferrer'
              >
                <FaGithub className='h-4 w-4 self-center mr-1' />
              </a>
            </Tooltip>
          </CardFooter>
        </Card>
      </CardBody>
    </Card>
  );
};

export default DeveloperContact;
