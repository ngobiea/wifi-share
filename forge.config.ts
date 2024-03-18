import { join } from 'path';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: join(__dirname, './resources/icon.ico'),
    name: 'WiFi-Share',
    executableName: 'WiFi-Share',
    appBundleId: 'com.ngobiea.wifi-share',
    appCategoryType: 'public.app-category.utilities',
    win32metadata: {
      CompanyName: 'Augustine Ngobie',
      FileDescription: 'Share your WiFi with friends and family with ease',
      OriginalFilename: 'WiFi-Share',
      ProductName: 'WiFi Share',
      InternalName: 'WiFi Share',
    },
    appVersion: '1.0.0',
    appCopyright: 'Augustine Ngobie @2024',

  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: 'WiFi-Share',
      iconUrl:
        'https://raw.githubusercontent.com/ngobiea/WiFi-Share-Icon/master/icons/icon.ico',
      authors: 'Augustine Ngobie',
      setupIcon: './resources/icon.ico',
      // exe: 'WiFi-Share',
      noMsi: true,
      setupExe: 'WiFi-Share-Setup.exe',
      title: 'WiFi Share',
      description: 'Share your WiFi with friends and family with ease',
      setupMsi: 'WiFi-Share-Setup.msi',
      version: '1.0.0',
      copyright: 'Augustine Ngobie',
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      devContentSecurityPolicy:
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",

      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer/index.html',
            js: './src/renderer/src/main.tsx',
            name: 'main_window',
            preload: {
              js: './src/preload/index.ts',
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
