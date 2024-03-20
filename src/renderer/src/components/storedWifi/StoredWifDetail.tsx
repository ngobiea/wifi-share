import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  ButtonGroup,
} from '@material-tailwind/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentStoredWifi } from '../../store/slices/appSlice';
import QRCode from 'react-qr-code';
import { LuCopyCheck, LuCopy } from 'react-icons/lu';
import { useState } from 'react';
import { MdSave } from 'react-icons/md';

const StoredWifDetail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { currentStoredWifi, isDarkMode } = useAppSelector(
    (state) => state.app
  );
  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState('Copy Password');

  const handleOpen = (): void => {
    dispatch(setCurrentStoredWifi(null));
  };
  const value = `WIFI:S:${currentStoredWifi?.ssid};T:${currentStoredWifi?.security};P:${currentStoredWifi?.password};;H:false;`;

  return (
    <Dialog
      open={currentStoredWifi !== null}
      handler={handleOpen}
      className={`relative pt-10 w-full max-w-[58rem]  justify-center m-auto overflow-hidden mt-10 text-center ${
        isDarkMode ? ' bg-gray-800' : ''
      }`}
    >
      <DialogHeader>
        <div
          style={{
            height: 'auto',
            margin: '0 auto',
            maxWidth: 184,
            width: '100%',
          }}
        >
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={value || ''}
            viewBox={`0 0 256 256`}
          />
        </div>
      </DialogHeader>
      <DialogBody
        divider
        className={`${isDarkMode ? 'text-white' : 'text-blue-gray-700'}`}
      >
        <div className={`grid grid-cols-3 gap-8 `}>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>SSID</Typography>
            <Typography>{currentStoredWifi?.ssid ?? ''}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Password</Typography>
            <Typography>{currentStoredWifi?.password ?? ''}</Typography>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <Typography variant='h6'>Security</Typography>
            <Typography>{currentStoredWifi?.security ?? ''}</Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className='flex justify-center'>
        <ButtonGroup color='blue-gray' className='gap-1'>
          <Button
            className='flex w-48 justify-center'
            onClick={() => {
              window.wifi.saveQRCodeImage({
                password: currentStoredWifi?.password as string,
                security: currentStoredWifi?.security as string,
                ssid: currentStoredWifi?.ssid as string,
              });
            }}
          >
            <MdSave className='self-center mr-1 w-5 h-5' />
            Save Image
          </Button>
          <Button
            className='flex w-48 justify-center'
            onClick={() => {
              window.wifi.copyPassword(currentStoredWifi?.password as string);
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
            {copyText}
          </Button>
        </ButtonGroup>
      </DialogFooter>
    </Dialog>
  );
};

export default StoredWifDetail;
