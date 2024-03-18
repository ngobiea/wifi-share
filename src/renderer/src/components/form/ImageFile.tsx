import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import jsQR from 'jsqr';
import { isImageFile } from './utils/imageFile';
import { parseWifiString } from '../../utils/app';
import { useAppDispatch } from '../../store/hooks';
import { setQRCode } from '../../store/slices/appSlice';
import { ImageFileProps } from '../openImage/OpenImage';
const ImageFile = ({
  imgSrc,
  handleSetImgSrc,
}: ImageFileProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = isImageFile(event);
    console.log(file);
    if (file) {
      handleSetImgSrc(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = handleFileLoad;
      reader.readAsDataURL(file);
    } else {
      handleSetImgSrc(null);
    }
  };
  const handleFileLoad = (e: ProgressEvent<FileReader>): void => {
    const img = new Image();
    img.onload = (): void => handleImageLoad(img);
    if (e.target?.result) {
      img.src = e.target.result as string;
    }
  };
  const handleImageLoad = (img: HTMLImageElement): void => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    console.log(code);
    if (code) {
      console.log('QR Code Data:', code.data);

      // Here you can handle the QR code content (e.g., update state or call a function)
      console.log('Found QR code', code.data);
      console.log(parseWifiString(code.data));
      dispatch(setQRCode(code.data));
    } else {
      console.log('No QR code found');
      dispatch(setQRCode(''));
    }
  };
  useEffect(() => { 
    if (imgSrc) {
      const img = new Image();
      img.onload = (): void => handleImageLoad(img);
      img.src = imgSrc;
    }
  }, [imgSrc]);
  return (
    <div className='flex w-full justify-center pt-1'>
      <div className='rounded-md relative h-48 border border-gray-100 bg-white shadow-md w-3/12 mb-3'>
        <label
          htmlFor='upload'
          className='flex w-full h-full flex-col justify-center items-center gap-2 cursor-pointer'
        >
          {imgSrc ? (
            <img
              className='absolute inset-0 w-full h-full rounded-md'
              src={imgSrc}
              alt='content'
            />
          ) : (
            <>
              <MdAddPhotoAlternate className=' text-2xl self-center inset-0 text-gray-400' />
              <span className='text-gray-600 font-medium'>Select Image</span>
            </>
          )}
        </label>
        <input
          onChange={handleFileChange}
          id='upload'
          type='file'
          className='hidden'
          accept={'.png,.jpg,.jpeg'}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
    </div>
  );
};

export default ImageFile;
