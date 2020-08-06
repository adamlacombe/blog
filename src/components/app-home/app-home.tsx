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
          Nothing here yet...
        </p>
      </div>
    </host>;
  }
}
