import React from 'react';
import { Navbar, Typography, IconButton } from '@material-tailwind/react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { MdLightMode, MdModeNight } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleDarkMode, setOpenSidenav } from '../../store/slices/appSlice';
const windowSize = 960;

const AppNavbar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { openSidenav, isDarkMode, tab } = useAppSelector((state) => state.app);

  const handleWindowResize = (): void => {
    console.log(window.innerWidth);
    if (window.innerWidth >= windowSize) {
      dispatch(setOpenSidenav(!openSidenav));
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      className={`mx-auto max-w-screen-2xl px-6 flex justify-between border-none  ${
        isDarkMode ? ' bg-gray-700 text-white' : 'text-blue-gray-700'
      }`}
    >
      <div className='flex items-center justify-between  w-full'>
        <Typography variant='h6' className='mr-4 cursor-pointer py-1.5'>
          {tab}
        </Typography>
        <div className=' space-x-5'>
          <IconButton
            variant='text'
            className='h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent'
            ripple={true}
            onClick={() => dispatch(toggleDarkMode())}
          >
            {isDarkMode ? (
              <MdModeNight className='h-6 w-6' />
            ) : (
              <MdLightMode className='h-6 w-6' />
            )}
          </IconButton>
          <IconButton
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => dispatch(setOpenSidenav(!openSidenav))}
          >
            {openSidenav ? (
              <HiXMark className='h-8 w-8 ' />
            ) : (
              <HiBars3 className='h-8 w-8' />
            )}
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
};
export default AppNavbar;
