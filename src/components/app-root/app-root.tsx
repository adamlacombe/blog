import { Component, h, Host } from '@stencil/core';
import { match, Route } from 'stencil-router-v2';
import { state } from '../../global/store';

const Router = state.router;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return <Host>
      <Router.Switch>

        <Route path={"/"} render={({ page }) => <app-home />} />
        {/* <Route path={match('/blog/:page')} render={({ page }) => <blog-post page={page} />} /> */}

      </Router.Switch>
    </Host>;
  }
}
