import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleWelcome } from '../../store/slices/appSlice';

const Welcome = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isShowWelcome } = useAppSelector((state) => state.app);

  const handleOpen = () => {
    dispatch(toggleWelcome());
  };

  return (
    <>
      <Dialog open={isShowWelcome} size='lg' handler={handleOpen}>
        <DialogHeader>Thank you for using WiFi Share</DialogHeader>
        <DialogBody>
          <p>
            WiFi Share is a free and open-source software that allows you to
            share your internet connection with other devices. It is built with
            ❤️ from an passionate software engineer & developer who loves to
            build things to make the world a better place.
          </p>
          <p>
            If you like this project, please consider giving it a star on{' '}
            <a
              href='https://github.com/ngobiea/wifi-share'
              className='text-blue-500'
              target='_blank'
              rel='noreferrer'
            >
              GitHub
            </a>
            .
          </p>
          <p>If you have any questions, feel free to reach out to me at:</p>
          <div>
            <a
              href='mailto:ngobiea@gmail.com'
              className='text-blue-500 inline-flex'
              target='_blank'
              rel='noreferrer'
            >
              <BiLogoGmail className='h-4 w-4 self-center mr-1' />
              GMail
            </a>
          </div>

          <div>
            <a
              href='https://www.linkedin.com/in/augustine-foday-ngobie-569723294/'
              className='text-blue-500 inline-flex'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin className='h-4 w-4 self-center mr-1' />
              LinkedIn
            </a>
          </div>
          <div>
            <a
              href='https://wa.me/+923705514270'
              className='text-blue-500 inline-flex'
              target='_blank'
              rel='noreferrer'
            >
              <FaWhatsapp className='h-4 w-4 self-center mr-1' />
              Whatsapp
            </a>
          </div>
          <div>
            <a
              href='https://github.com/ngobiea'
              className='text-blue-500 inline-flex'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub className='h-4 w-4 self-center mr-1' />
              Github
            </a>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant='gradient' color='blue-gray' onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Welcome;
