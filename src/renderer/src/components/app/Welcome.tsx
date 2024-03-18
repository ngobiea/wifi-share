import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const Welcome = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Thank you for using WiFi Share</DialogHeader>
        <DialogBody>
          <p>
            WiFi Share is a free and open-source software that allows you to
            share your internet connection with other devices. It is built with
            ❤️ from an passionate software engineer & developer who loves to build things to
            make the world a better place.
          </p>
          <p>
            If you have any questions, feel free to reach out to me at{' '}
            <a
              href='mailto:
              '
              className='text-blue-500'
            >
              {' '}
            </a>
            .
          </p>
          <p>
            If you like this project, please consider giving it a star on{' '}
            <a
              href='
              '
              className='text-blue-500'
            >
              GitHub
            </a>
            .
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Welcome;
