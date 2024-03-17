import { useAppSelector } from '../../store/hooks';
import ConnectedWifiDetails from './ConnectedWifiDetails';
import NotConnectedError from './NotConnectedError';
function QRReader(): JSX.Element {
  const { isConnected } = useAppSelector((state) => state.app);

  let content = <ConnectedWifiDetails />;
  if (!isConnected) {
    content = <NotConnectedError />;
  }
  return <>{content}</>;
}
export default QRReader;
