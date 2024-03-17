import { Spinner } from '@material-tailwind/react';

const AppSpinner = (): JSX.Element => {
  return (
    <div className=' w-full flex justify-center '>
      <Spinner color='blue-gray' className='h-20 w-20' />;
    </div>
  );
};

export default AppSpinner;
