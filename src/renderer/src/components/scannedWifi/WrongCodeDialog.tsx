import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleWrongCode } from '../../store/slices/appSlice';

const WrongCodeDialog = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isShowWrongCode, isDarkMode } = useAppSelector((state) => state.app);

  const handleOpen = (): void => {
    dispatch(toggleWrongCode());
  };

  return (
    <Dialog
      open={isShowWrongCode}
      handler={handleOpen}
      className={`${isDarkMode ? ' bg-gray-800' : ''}`}
    >
      <DialogHeader
        className={`${isDarkMode ? ' text-white' : ' text-blue-gray-700'}`}
      >
        Wrong QR Code
      </DialogHeader>
      <DialogBody
        className={`${isDarkMode ? ' text-white' : ' text-blue-gray-700'}`}
      >
        <div className='flex flex-col items-center gap-1'>
          <Typography variant='h6'>
            The QR code you scanned is not a valid WiFi QR code.
          </Typography>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant='filled'
          color='blue-gray'
          onClick={handleOpen}
          className='mr-1'
        >
          <span>Close</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default WrongCodeDialog;
