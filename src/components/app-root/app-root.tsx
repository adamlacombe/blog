import { Component, h, Host } from '@stencil/core';
import { Route } from 'stencil-router-v2';
import { state } from '../../global/store';

const Router = state.router;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true
})
export class AppRoot {

  render() {
    return <Host>
      <div class="">
        <div class="wrapper">
          <div class="header">
            <div class="about">
              <img src="/assets/profile_photo.jpg" class="profile-photo" />
            </div>
            <h1>Adam LaCombe</h1>
            <h2>Web Developer</h2>

            <div class="social">
              <a href="https://stackoverflow.com/users/9238321/adam-lacombe" target="_blank"><fa-icon type="fab" name="stack-overflow" /></a>
              <a href="https://twitter.com/adamlacombe" target="_blank"><fa-icon type="fab" name="twitter" /></a>
              <a href="https://github.com/adamlacombe" target="_blank"><fa-icon type="fab" name="github" /></a>
              <a href="https://dev.to/adamlacombe" target="_blank"><fa-icon type="fab" name="dev" /></a>
            </div>
          </div>
          <div class="main-body">
            <Router.Switch>
              <Route path={"/"} render={({ page }) => <app-home />} />
              {/* <Route path={match('/blog/:page')} render={({ page }) => <blog-post page={page} />} /> */}

            </Router.Switch>
          </div>
        </div>
      </div>
    </Host>;
  }
}
