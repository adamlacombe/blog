import { Component, h, Host, Listen, State } from '@stencil/core';
import { match, Route } from 'stencil-router-v2';
import blogContent from '../../assets/blog/list.json';
import profile from '../../assets/github/profile.json';
import { IGithubProfile } from '../../global/definitions';
import { clickRoutableLink, defaults, Router, state } from '../../global/store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true
})
export class AppRoot {

  @State() profile: IGithubProfile;

  async componentWillLoad() {
    this.profile = profile as any;
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
          <header>
            <div class="header" itemscope itemtype="http://schema.org/Person">

              <div class="container">
                <div class="left-side">
                  <div class="about">
                    <div>
                      <a href="/" onClick={(e) => clickRoutableLink(e)}>
                        <al-img
                          width={this.profile.avatar_url.dimensions.width}
                          height={this.profile.avatar_url.dimensions.height}
                          src={this.profile.avatar_url.original}
                          class="profile-photo"
                          alt={defaults.name}
                          itemprop="image" />
                      </a>
                    </div>
                    <div>
                      <h1 itemprop="givenName">{defaults.name}</h1>
                      <h2 itemprop="jobTitle">{defaults.jobTitle}</h2>
                    </div>
                  </div>
                </div>

                <div class="right-side">
                  <div class="social">
                    <a itemprop="sameAs" href="https://stackoverflow.com/users/9238321/adam-lacombe" target="_blank" rel="noopener" aria-label="Stack Overflow" title="Stack Overflow">
                      <ion-icon name="logo-stackoverflow" />
                    </a>
                    <a itemprop="sameAs" href="https://github.com/adamlacombe" target="_blank" aria-label="Github" rel="noopener" title="Github">
                      <fa-icon type="fab" name="github" />
                    </a>
                    <a itemprop="sameAs" href="https://dev.to/adamlacombe" target="_blank" aria-label="Dev.to" rel="noopener" title="Dev.to">
                      <fa-icon type="fab" name="dev" />
                    </a>
                    <a itemprop="sameAs" href="https://www.npmjs.com/~adamlacombe" target="_blank" aria-label="npm" rel="noopener" title="npm">
                      <ion-icon name="logo-npm" />
                    </a>
                    <a itemprop="sameAs" href="https://twitter.com/adamlacombe" target="_blank" aria-label="Twitter" rel="noopener" title="Twitter">
                      <fa-icon type="fab" name="twitter" />
                    </a>
                    <a itemprop="sameAs" href="https://facebook.com/adamlacombe" target="_blank" aria-label="Facebook" rel="noopener" title="Facebook">
                      <ion-icon name="logo-facebook" />
                    </a>
                    <a itemprop="sameAs" href="https://www.instagram.com/webdev204/" target="_blank" aria-label="Instagram" rel="noopener" title="Instagram">
                      <ion-icon name="logo-instagram" />
                    </a>
                    <a itemprop="sameAs" href="https://www.youtube.com/channel/UCiXI3lJmntB9O9Ivoj8kmoA" target="_blank" aria-label="YouTube" rel="noopener" title="YouTube">
                      <ion-icon name="logo-youtube" />
                    </a>
                    <a itemprop="sameAs" href="https://open.spotify.com/artist/0ijyuqEToJvAjx6Qq7BQxB?si=QppfE7dUSXSrEW86un3vrw" target="_blank" aria-label="Spotify" rel="noopener" title="Spotify">
                      <fa-icon type="fab" name="spotify" />
                    </a>
                  </div>
                  <div class="sponsor">
                    <iframe src="https://github.com/sponsors/adamlacombe/button" title="Sponsor adamlacombe" height="35" width="107" style={{ border: '0' }} />
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="stats-wrapper">
                <div class="stats-inner">
                  <a href="/" aria-label="Home" title="Home">
                    <div>&nbsp;</div>
                    <div>Home</div>
                  </a>

                  <a href="/blog" aria-label="Blog" title="Blog">
                    <div>{blogContent.length}</div>
                    <div>Blog</div>
                  </a>

                  <a href="https://github.com/adamlacombe?tab=repositories&type=source" target="_blank" rel="noopener" aria-label="Repos" title="Repos">
                    <div>{this.profile.public_repos}</div>
                    <div>Repos</div>
                  </a>
                  <a href="https://gist.github.com/adamlacombe" target="_blank" rel="noopener" aria-label="Gists" title="Gists">
                    <div>{this.profile.public_gists}</div>
                    <div>Gists</div>
                  </a>
                  <a href="https://github.com/adamlacombe?tab=followers" target="_blank" rel="noopener" aria-label="Followers" title="Followers">
                    <div>{this.profile.followers}</div>
                    <div>Followers</div>
                  </a>
                  <a href="https://github.com/adamlacombe?tab=following" target="_blank" rel="noopener" aria-label="Following" title="Following">
                    <div>{this.profile.following}</div>
                    <div>Following</div>
                  </a>

                </div>
              </div>
            </div>
          </header>
          <div class="main-body">
            {(!state.menuIsOpen) && <div onClick={() => state.menuIsOpen = true}>
              <ion-icon name="menu-outline" /> Menu
            </div>}
            <Router.Switch>
              <Route path={"/"} render={({ page }) => <app-home />} />
              <Route path={match('/blog', { exact: true })} render={({ page }) => <page-blog />} />
              <Route path={match('/blog/:page')} render={({ page }) => <blog-post page={`/blog/${page}`} />} />
            </Router.Switch>
          </div>
        </div>
      </div>
    </Host>;
  }
}
