import { Component, h, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import { IGithubRepo } from '../../global/definitions';
import { getRepos } from '../../global/github.worker';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  @State() repos: IGithubRepo[];

  async componentWillLoad() {
    this.repos = await getRepos();
  }

  render() {
    return <host>
      <Helmet>
        <title>Adam LaCombe</title>
        <meta name="description" content={`Web dev blog with focus on StencilJS`} />
        <meta name="twitter:description" content={`Web dev blog with focus on StencilJS`} />
      </Helmet>
      <div class='app-home'>
        {/* <p>
          <img src="https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logo=javascript" alt="Javascript" />
          <img src="https://img.shields.io/badge/-Typescript-294E80?style=for-the-badge&&logo=typescript" alt="Typescript" />
          <img src="https://img.shields.io/badge/-PHP-8892BF?style=for-the-badge&logo=php&logoColor=fff" alt="PHP" />
          <img src="https://img.shields.io/badge/-Cloudflare-f48120?style=for-the-badge&logo=cloudflare&logoColor=fff" alt="Cloudflare" />
          <img src="https://img.shields.io/badge/-Redis-d92b21?style=for-the-badge&logo=redis&logoColor=fff" alt="Redis" />
          <img src="https://img.shields.io/badge/-Google%20Cloud-1a73e8?style=for-the-badge&logo=google-cloud&logoColor=fff" alt="Google Cloud" />
          <img src="https://img.shields.io/badge/-Docker-34a0ef?style=for-the-badge&logo=docker&logoColor=fff" alt="Docker" />
          <img src="https://img.shields.io/badge/-mysql-4479a1?style=for-the-badge&logo=mysql&logoColor=fff" alt="MySQL" />
          <img src="https://img.shields.io/badge/-NodeJS-026e00?style=for-the-badge&logo=Node.js&logoColor=fff" alt="NodeJS" />
        </p> */}

        {(this.repos && this.repos.length > 0) && <div class="repos">
          {this.repos.map(repo => <repo-card repo={repo} />)}
        </div>}
      </div>
    </host>;
  }
}
