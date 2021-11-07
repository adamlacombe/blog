import { env } from '@alepop/stencil-env';
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://adamlacombe.com/',
      prerenderConfig: './prerender.config.ts',
      serviceWorker: {
        unregister: true
      },
      copy: [
        {
          src: 'feed.xml',
          dest: 'feed/feed.xml'
        },
        {
          src: 'ads.txt',
          dest: 'ads.txt'
        }
      ]
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender',
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/global.scss',
      ],
    }),
    env({})
  ],
  enableCache: false,
  devServer: {
    openBrowser: false,
    port: 3337
  }
};
