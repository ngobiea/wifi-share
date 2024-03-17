// export const parseWifiString = (wifiString: string): WifiDataType => {
//   // Remove 'WIFI:' from the beginning of the string
//   wifiString = wifiString.replace('WIFI:', '');

//   // Split the string by semicolons to separate each parameter
//   const params = wifiString.split(';');

//   // Initialize an empty object to store key-value pairs
//   const wifiData = {
//     S: '',
//     T: '',
//     P: '',
//     H: false,
//   };
//   // Iterate through each parameter
//   params.forEach((param) => {
//     // Split each parameter by colon to separate key and value
//     const [key, value] = param.split(':');
//     // If the parameter has both key and value
//     if (key && value) {
//       // Store key-value pair in the object
//       wifiData[key] = value;
//     }
//   });

//   return wifiData;
// };

export const containsEnterprise = (str: string): boolean => {
  // Convert the string to lowercase for case-insensitive matching
  const lowercaseStr = str.toLowerCase();

  // Check if the lowercased string includes the word "enterprise"
  if (lowercaseStr.includes('enterprise')) {
    return true;
  }

  // If the word "enterprise" is not found, return false
  return false;
};
