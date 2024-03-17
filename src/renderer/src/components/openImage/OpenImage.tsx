import { Card, CardHeader, CardBody, Button, Typography } from '@material-tailwind/react';
import ImageFile from '../form/ImageFile';
import { useState } from 'react';
import { setScanStatus } from '../../store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
export interface ImageFileProps {
  imgSrc: string | null;
  handleSetImgSrc: (src: string | null) => void;
}
function OpenImage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { scanStatus, isDarkMode } = useAppSelector((state) => state.app);
  const handleResetImage = (): void => {
    setImgSrc(null);
    dispatch(setScanStatus('Select an image containing the QR code'));
  };
  const handleSetImgSrc = (src: string | null): void => {
    setImgSrc(src);
  };

  return (
    <Card
      className={`relative h-[35rem] w-full max-w-[58rem] flex flex-col justify-center m-auto overflow-hidden mt-10  ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }`}
    >
      <CardHeader color='blue-gray' className='relative h-[13rem]'>
        <ImageFile imgSrc={imgSrc} handleSetImgSrc={handleSetImgSrc} />
      </CardHeader>
      <CardBody
        className={`px-10 h-[12rem] ${
          isDarkMode ? 'text-white' : 'text-blue-gray-700'
        }`}
      >
        <Typography variant='h6' className={'text-center'}>
          {scanStatus}
        </Typography>
        <div className='flex justify-center'>
          {imgSrc && (
            <Button color='light-blue' type='submit' onClick={handleResetImage}>
              Reset Image
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}


export default OpenImage;
