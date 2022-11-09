import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerRpm } from '@electron-forge/maker-rpm'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import type { ForgeConfig } from '@electron-forge/shared-types'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const config: ForgeConfig = {
  packagerConfig: {
    icon: './assets/icons/icon',
    name: '重返帝国小助手',
    appBundleId: 'com.qingmu-stack.cfdg-app',
    appCategoryType: 'public.app-category.games',
    overwrite: true,
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
      config: {
        icon: './assets/icons/',
      },
    },
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  publishers: [],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './assets/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
}

export default config
