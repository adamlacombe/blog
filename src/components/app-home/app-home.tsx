import { Component, h } from '@stencil/core';
import Helmet from '@stencil/helmet';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  render() {
    return <host>
      <Helmet>
        <title>Adam LaCombe</title>
        <meta name="description" content={`Web dev blog with focus on StencilJS`} />
        <meta name="twitter:description" content={`Web dev blog with focus on StencilJS`} />
      </Helmet>
      <div class='app-home'>
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
          Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>
      </div>
    </host>;
  }
}
