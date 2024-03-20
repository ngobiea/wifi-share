import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { MdOutlineFilePresent,MdInfoOutline } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AiOutlineScan } from 'react-icons/ai';
import { BsQrCodeScan } from 'react-icons/bs';
import { FaWifi } from 'react-icons/fa';
import { changeTab } from '../../store/slices/appSlice';
import { LuImagePlus } from 'react-icons/lu';
type SideBar = {
  label: string;
  value: tab;
  icon: JSX.Element;
};
const SideBar: SideBar[] = [
  {
    label: 'Wi-Fi Share',
    value: 'Wi-Fi Share',
    icon: <BsQrCodeScan />,
  },
  {
    label: 'Wi-Fi Scan',
    value: 'Wi-Fi Scan',
    icon: <AiOutlineScan />,
  },

  {
    label: 'Create QR Image',
    value: 'Create QR Image',
    icon: <LuImagePlus />,
  },
  {
    label: 'Open QR Image',
    value: 'Open QR Image',
    icon: <MdOutlineFilePresent />,
  },
  {
    label: 'Stored Wi-Fi',
    value: 'Stored Wi-Fi',
    icon: <FaWifi />,
  },
  {
    label: 'About',
    value: 'About',
    icon: <MdInfoOutline />,
  }
];

const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { openSidenav, tab, isDarkMode } = useAppSelector((state) => state.app);
  const activeStyle = `flex w-full h-full p-3 items-center gap-4 px-4 capitalize bg-blue-gray-500 text-white rounded`;
  const inActiveStyle = `flex w-full h-full p-3 items-center gap-4 px-4 capitalize ${
    isDarkMode ? 'text-white hover:bg-gray-600' : 'text-blue-gray-900'
  } `;
  return (
    <Card
      className={`${
        openSidenav ? 'translate-x-0' : ' -translate-x-80'
      } fixed top-0 z-50 my-4 ml-4 h-[calc(100vh-38px)] w-64 ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }  transition-transform duration-300 xl:translate-x-0`}
    >
      <div className='mb-2 p-4'></div>
      <List>
        {SideBar.map((item) => {
          const { label, value, icon } = item;
          return (
            <ListItem
              className='p-0'
              key={value}
              onClick={() => dispatch(changeTab(value))}
            >
              <div className={tab === value ? activeStyle : inActiveStyle}>
                <ListItemPrefix>{icon}</ListItemPrefix>
                {label}
              </div>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
export default Sidebar;
