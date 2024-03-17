import { Button, Dialog, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
import { useAppContext } from '../../hooks/use-app-context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleConnect } from '../../store/slices/appSlice';
import icon from '../../assets/icon.png';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { useState } from 'react';

window.wifi.onConnection((response: IPCResponse) => {
  const { status, message } = response;
  if (status === 'success') {
    new Notification('Wifi connected', {
      body: message,
      icon,
    });
  } else {
    new Notification('Wifi connection failed', {
      body: message,
      icon,
    });
  }
});
const ConnectDialog = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isShowConnect, connectedWifi, isDarkMode } = useAppSelector(
    (state) => state.app
  );
  const { disableWebcam } = useAppContext();
  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState('Copy Password');

  const handleOpen = (): void => {
    dispatch(toggleConnect());
    disableWebcam();
  };

  return (
    <Dialog
      open={isShowConnect}
      size='lg'
      handler={handleOpen}
      className={`${isDarkMode ? ' bg-gray-800' : ''}`}
    >
      <DialogBody
        className={`${isDarkMode ? ' text-white' : ' text-blue-gray-700'}`}
      >
        <div className='grid grid-cols-3 gap-8'>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Network Name (SSID)</Typography>
            <Typography>{connectedWifi?.S ?? ''}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Password</Typography>
            <Typography>***********</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Security</Typography>
            <Typography>{connectedWifi?.T ?? ''}</Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className=' space-x-10'>
        <Button
          variant='text'
          color='red'
          onClick={() => {
            dispatch(toggleConnect());
            disableWebcam();
          }}
          className='mr-1 w-48'
        >
          <span>Cancel</span>
        </Button>
        <Button
          color='blue-gray'
          className='flex w-48 justify-center'
          onClick={() => {
            window.wifi.copyPassword(connectedWifi?.P as string);
            disableWebcam();
            setIsCopied(true);
            setCopyText('Password Copied');
            setTimeout(() => {
              setIsCopied(false);
              setCopyText('Copy Password');
            }, 3000);
          }}
        >
          {isCopied ? (
            <LuCopyCheck className='self-center mr-1  w-5 h-5' />
          ) : (
            <LuCopy className='self-center mr-1 w-5 h-5' />
          )}
          <p className=' self-center'>{copyText}</p>
        </Button>
        <Button
          variant='gradient'
          color='blue-gray'
          onClick={() => {
            window.wifi.connectWifi({
              ssid: connectedWifi?.S as string,
              password: connectedWifi?.P as string,
            });
            dispatch(toggleConnect());
            disableWebcam();
          }}
          className=' w-48'
        >
          <span>Connect</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConnectDialog;
