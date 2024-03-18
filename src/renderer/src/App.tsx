import Sidebar from './components/app/SideBar';
import { useAppSelector, useAppDispatch } from './store/hooks';
import QRReaderModal from './components/connectedWifi/QRReaderModal';
import QRReader from './components/connectedWifi/QRReader';
import QRScanner from './components/scannedWifi/QRScanner';
import { useEffect } from 'react';
import ScannedWifi from './components/scannedWifi/ScannedWifi';
import { useAppContext } from './hooks/use-app-context';
import ConnectDialog from './components/scannedWifi/ConnectDialog';
import { getDevices } from './store/thunks/getDevices';
import CodeForm from './components/createCode/CodeForm';
import OpenImage from './components/openImage/OpenImage';
import WrongCodeDialog from './components/scannedWifi/WrongCodeDialog';
import { appStatus } from './utils/appStatus';
import StoredWifi from './components/storedWifi/StoredWifi';
import WifiDetail from './components/storedWifi/StoredWifDetail';
import NavbarSimple from './components/app/AppNavbar';
import Welcome from './components/app/Welcome';
appStatus();

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { tab, isDarkMode } = useAppSelector((state) => state.app);

  const { disableWebcam, stream } = useAppContext();
  useEffect(() => {
    if (stream) {
      disableWebcam();
    }
  }, [tab]);
  useEffect(() => {
    dispatch(getDevices());
  
  }, []);
  let content = <QRScanner />;
  if (tab === 'Open QR Image') {
    content = <OpenImage />;
  } else if (tab === 'Wi-Fi Share') {
    content = <QRReader />;
  } else if (tab === 'Stored Wi-Fi') {
    content = <StoredWifi />;
  } else if (tab === 'Wi-Fi Scan') {
    content = <QRScanner />;
  } else if (tab === 'Create QR Image') {
    content = <CodeForm />;
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-black' : 'bg-blue-gray-100/40'
      }  `}
    >
      <Sidebar />
      <WrongCodeDialog />
      <QRReaderModal />
      <ConnectDialog />
      <ScannedWifi />
      <WifiDetail />
      <Welcome />
      <div className='p-4 xl:ml-72 relative'>
        <NavbarSimple />
        {content}
      </div>
    </div>
  );
}

export default App;
