import { Card, CardBody, Typography } from '@material-tailwind/react';
import { useAppSelector } from '../../store/hooks';

const Description = (): JSX.Element => {
  const { isDarkMode } = useAppSelector((state) => state.app);

  return (
    <Card
      className={`mt-6 w-full ${isDarkMode ? ' bg-gray-700 text-white' : ''}`}
    >
      <CardBody>
        <Typography variant='h5' className={`mb-2`}>
          Description
        </Typography>
        <Typography>
          WiFi Share is a simple and easy to use application that allows you to
          share your computer's internet connection with other devices.
        </Typography>
        <Typography>
          WiFi Share let you view your current WiFi network information such as
          wifi security, network quality IP Address, MAC Address and Link Speed.
        </Typography>
        <Typography>
          WiFi Share let you generate QR Code of your current connected WiFi
          network which can be scan by other devices and then connect to your
          current WiFi network.
        </Typography>
        <Typography>
          WiFi Share utilizes your device webcam to scan a WiFi QR Code and
          instantly connect to the WiFi network.
        </Typography>
        <Typography>
          WiFi Share also allows you to view all the WiFi networks available
          around you.
        </Typography>
        <Typography>
          WiFi Share allows to create a WiFi QR Code and export it as a PNG
          image.
        </Typography>
        <Typography>
          WiFi Share alo allows you to import a WiFi QR Code from an image file
          and connect to the WiFi network.
        </Typography>

        <Typography>
          WiFi Share also allows you to view all the WiFi networks you have
          connected to in the past.
        </Typography>
        <Typography>
          WiFi Share allows you to export your current WiFi network as a QR
          Code.
        </Typography>
        <Typography>
          WiFi Share also allows you to import a WiFi network from a QR Code.
        </Typography>
        <Typography>
          WiFi Share allows you to view all the WiFi networks you have
          connected to in the past.
        </Typography>
        <Typography>
          WiFi Share also allows you to view the password and QR Code of all the
          WiFi networks you have connected to in the past.
        </Typography>
        <Typography>
          WiFi Share let you export the QR Code as image of all the WiFi networks you
          have connected to in the past.
        </Typography>
        <Typography>
          With WiFi Share, non of you data is shared with any server. All your data is stored locally on your device.
        </Typography>

      </CardBody>
    </Card>
  );
};

export default Description;
