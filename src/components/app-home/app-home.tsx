import { Component, h, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import blogContent from '../../assets/blog/list.json';
import { BlogPostInterface, IGithubOrg, IGithubRepo } from '../../global/definitions';
import { getOrgs, getRepos } from '../../global/github.worker';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true
})
export class AppHome {

  @State() repos: IGithubRepo[];
  @State() orgs: IGithubOrg[];
  @State() posts: BlogPostInterface[];

  async componentWillLoad() {
    this.repos = await getRepos();
    this.orgs = await getOrgs();
    this.posts = blogContent as any;
  }

  render() {
    return <host>
      <Helmet>
        <title>Adam LaCombe</title>
        <meta name="keywords" content={""} />
        <meta name="description" content={`Web dev blog with focus on StencilJS`} />
        <meta name="og:description" content={`Web dev blog with focus on StencilJS`} />
        <meta name="twitter:description" content={`Web dev blog with focus on StencilJS`} />
        <meta name="og:image" content={"https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"} />
        <meta name="twitter:image" content={"https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"} />
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

        {(this.posts && this.posts.length > 0) && <article>
          <h1>Blog Posts</h1>
          <div class="posts">
            {this.posts.map(post => <blog-card post={post} />)}
          </div>
        </article>}

        {(this.orgs && this.orgs.length > 0) && <article>
          <h1>Organizations</h1>
          <div class="orgs">
            {this.orgs.map(org => <org-card org={org} />)}
          </div>
        </article>}

        {(this.repos && this.repos.length > 0) && <article>
          <h1>Repositories</h1>
          <div class="repos">
            {this.repos.filter(el => el.fork === false).map(repo => <repo-card repo={repo} />)}
          </div>
        </article>}
      </div>
    </host>;
  }
}
