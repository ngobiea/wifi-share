import { MdOutlineRemoveRedEye } from 'react-icons/md';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { FiRefreshCcw } from 'react-icons/fi';
import { TABLE_HEAD } from './utils/storedWifi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { fetchStoredWifi } from '../../store/thunks/fetchStoredWifi';
import { setCurrentStoredWifi } from '../../store/slices/appSlice';
import CustomSpinner from '../app/AppSpinner';
import { containsEnterprise } from '../../utils/app';
function StoredWifi(): JSX.Element {
  const dispatch = useAppDispatch();
  const { storedWifi, isStoredWifiLoading, isDarkMode } = useAppSelector(
    (state) => state.app
  );
  useEffect(() => {
    if (storedWifi.length === 0) {
      dispatch(fetchStoredWifi());
    }
  }, []);
  return (
    <Card
      className={`w-full h-full mt-2  ${
        isDarkMode ? ' bg-gray-800 text-white' : ''
      }`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none  ${
          isDarkMode ? ' bg-gray-800 text-white' : ''
        }`}
      >
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5'>Stored Wifi</Typography>
            <Typography className='mt-1 font-normal'>
              List of stored wifi passwords
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <Button
              variant='outlined'
              size='sm'
              className={`flex  ${
                isDarkMode ? ' bg-gray-800 text-white border border-white' : ''
              }`}
              loading={isStoredWifiLoading}
              onClick={() => {
                dispatch(fetchStoredWifi());
              }}
            >
              {!isStoredWifiLoading && (
                <FiRefreshCcw className=' self-center mr-1' />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className='overflow-x-auto px-0 h-[calc(100vh-220px)]'>
        {isStoredWifiLoading ? (
          <CustomSpinner />
        ) : (
          <table className='w-full min-w-full divide-y divide-gray-200 table-auto text-left h-full'>
            <thead className='sticky top-0 bg-white'>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-y border-blue-gray-200 bg-blue-gray-50/50 px-6 py-3 text-left text-sm font-medium text-blue-gray-700 uppercase tracking-wider'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal leading-none'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {storedWifi.map((wifi) => {
                const { id, ssid, security } = wifi;
                const classes = `border-b border-blue-gray-50 px-6 py-4 whitespace-nowrap ${
                  isDarkMode ? ' text-white' : 'text-blue-gray-700'
                }`;

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography variant='small'>{ssid}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small'>{security}</Typography>
                    </td>
                    {!containsEnterprise(security) && (
                      <td className={classes}>
                        <Tooltip
                          content='View Detail'
                          className={` ${
                            isDarkMode
                              ? ' text-bg-blue-gray-700 bg-white'
                              : 'bg-blue-gray-700 '
                          }`}
                        >
                          <IconButton
                            variant='text'
                            className={`p-1 border  ${
                              isDarkMode
                                ? ' text-white'
                                : 'text-blue-gray-700 border-gray-700'
                            } `}
                            onClick={() => {
                              dispatch(setCurrentStoredWifi(wifi));
                            }}
                          >
                            <MdOutlineRemoveRedEye className='h-4 w-4' />
                          </IconButton>
                        </Tooltip>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
}

export default StoredWifi;
