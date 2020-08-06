import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://myapp.local/',
      prerenderConfig: './prerender.config.ts',
      serviceWorker: {
        unregister: true,
      },
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender',
    },
  ]
};
