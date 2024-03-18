import { Card, CardHeader, CardBody, Button } from '@material-tailwind/react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../form/Input';
import Select from '../form/Select';
import { codeOptions } from './utils/createCode';
import QRCode from 'qrcode';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';

function CodeForm(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppNetwork>();
  const { isDarkMode } = useAppSelector((state) => state.app);
  const [qrCode, setQRCode] = useState<AppNetwork | null>(null);

  const onSubmit: SubmitHandler<AppNetwork> = async (data) => {
    const code = `WIFI:S:${data.ssid};T:${data.security};P:${data.password};H:false;;`;
    QRCode.toCanvas(canvasRef.current, code, function (error) {
      if (error) {
        console.error(error);
      } else {
        setQRCode(data);
        console.log('success!');
      }
    });
  };
  return (
    <Card
      className={`relative h-[35rem] w-full max-w-[58rem] flex flex-col justify-center m-auto overflow-hidden mt-10  ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }`}
    >
      <CardHeader color='blue-gray' className='relative h-56'>
        <div className='flex flex-col items-center py-1 space-y-1'>
          <canvas ref={canvasRef} />
        </div>
      </CardHeader>
      <CardBody className=' px-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <Input
              register={register}
              errors={errors}
              label={'Name (SSID)'}
              value={'ssid'}
              autoFocus={true}
              required={true}
              type={'text'}
            />
            <Input
              register={register}
              errors={errors}
              label={'Password'}
              value={'password'}
              autoFocus={false}
              required={true}
              type={'text'}
            />
          </div>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <Select
              register={register}
              label={'Security Type'}
              value={'security'}
              options={codeOptions}
              isChange={false}
              onSelectChange={(): void => null}
              errors={errors}
              required={true}
              requiredMessage='Please select a category'
            />
          </div>
          <div className='flex justify-end'>
            {qrCode && (
              <Button
                color='red'
                className='w-36 mr-6'
                onClick={() => {
                  setQRCode(null);
                  canvasRef.current?.getContext('2d')?.clearRect(0, 0, 300, 300);
                  reset();
                }}
              >
                Reset
              </Button>
            )}
            {qrCode && (
              <Button
                color='blue-gray'
                className='w-36 mr-6'
                onClick={() => {
                  window.wifi.saveQRCodeImage(qrCode);
                }}
              >
                Save Image
              </Button>
            )}
            <Button color='blue-gray' type='submit'
            disabled={qrCode !== null}
            >
              Create QR Code
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
export default CodeForm;
