import * as path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'assets'),
        to: path.resolve(__dirname, '.webpack/renderer/main_window/assets'),
      },
    ],
  }),
]
