import { Drawer, Typography, List, ListItem } from '@material-tailwind/react';
import { useAppSelector } from '../../store/hooks';


const ScannedWifi = (): JSX.Element => {
  const { tab, availableWifi, isDarkMode } = useAppSelector(
    (state) => state.app
  );

  return (
    <Drawer
      size={250}
      overlay={false}
      placement='right'
      open={tab === 'Wi-Fi Scan'}
      className={`p-4 bg-opacity-20 mt-[5.4rem] ${
        isDarkMode ? 'text-white' : ''
      }`}
    >
      <div className='mb-6 flex items-center justify-between'>
        <Typography variant='h5'>Available Networks</Typography>
      </div>
      <List className={`${isDarkMode ? 'text-white' : ''}`}>
        {availableWifi.map((network) => {
          return <ListItem key={network.bssid}>{network.ssid}</ListItem>;
        })}
      </List>
    </Drawer>
  );
};
export default ScannedWifi;
