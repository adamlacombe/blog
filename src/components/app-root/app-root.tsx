import { Component, h, Host, Listen, State } from '@stencil/core';
import { Route } from 'stencil-router-v2';
import { IGithubProfile } from '../../global/definitions';
import { getProfile } from '../../global/github.worker';
import { state } from '../../global/store';

const Router = state.router;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true
})
export class AppRoot {

  @State() profile: IGithubProfile;

  async componentWillLoad() {
    this.profile = await getProfile();
  }

  @Listen("swUpdate", { target: 'window' })
  async onSWUpdate() {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration || !registration.waiting) {
      // If there is no registration, this is the first service
      // worker to be installed. registration.waiting is the one
      // waiting to be activated.
      return;
    }

    registration.waiting.postMessage("skipWaiting");
    window.location.reload();
  }

  render() {
    return <Host class={{ 'menu-open': state.menuIsOpen }}>
      <div class="">
        <div class="wrapper">
          <div class="header">
            <div class="about">
              <img src={this.profile.avatar_url} class="profile-photo" alt="Adam LaCombe" />
            </div>
            <h1>{this.profile.name}</h1>
            <h2>Web Developer</h2>

            <div class="social">
              <a href="https://stackoverflow.com/users/9238321/adam-lacombe" target="_blank" rel="noopener" aria-label="Stack Overflow" title="Stack Overflow"><fa-icon type="fab" name="stack-overflow" /></a>
              <a href="https://twitter.com/adamlacombe" target="_blank" aria-label="Twitter" rel="noopener" title="Twitter"><fa-icon type="fab" name="twitter" /></a>
              <a href="https://github.com/adamlacombe" target="_blank" aria-label="Github" rel="noopener" title="Github"><fa-icon type="fab" name="github" /></a>
              <a href="https://dev.to/adamlacombe" target="_blank" aria-label="Dev.to" rel="noopener" title="Dev.to"><fa-icon type="fab" name="dev" /></a>
            </div>

            <div class="sponsor">
              <iframe src="https://github.com/sponsors/adamlacombe/button" title="Sponsor adamlacombe" height="35" width="107" style={{ border: '0' }} />
            </div>

            <div class="stats-wrapper">
              <div class="stats-inner">
                <div>
                  <div>{this.profile.public_repos}</div>
                  <div>Repos</div>
                </div>
                <div>
                  <div>{this.profile.public_gists}</div>
                  <div>Gists</div>
                </div>
                <div>
                  <div>{this.profile.followers}</div>
                  <div>Followers</div>
                </div>
                <div>
                  <div>{this.profile.following}</div>
                  <div>Following</div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-body">
            {(!state.menuIsOpen) && <div onClick={() => state.menuIsOpen = true}>
              <ion-icon name="menu-outline" /> Menu
            </div>}
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
