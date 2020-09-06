import { Component, h, Host, Prop } from '@stencil/core';
import { IGithubOrg } from '../../global/definitions';

@Component({
  tag: 'org-card',
  styleUrl: 'org-card.scss',
  shadow: true,
})
export class OrgCard {

  @Prop() org: IGithubOrg;

  render() {
    if (!this.org) return;

    return <Host style={{ '--theme-color': this.org.themeColor }} itemscope itemtype="http://schema.org/Organization">
      <div class="wrap">
        <div>
          <al-img
            width={this.org.avatar_url.dimensions.width}
            height={this.org.avatar_url.dimensions.height}
            src={this.org.avatar_url.original}
            alt={`${this.org.name}'s logo`}
            itemprop="logo" />
        </div>
        <div>
          <div class="name" itemprop="name">
            <ion-icon name="business-outline" />
            <a href={this.org.html_url} target="_blank" rel="noopener" itemprop="url">{this.org.name}</a>
          </div>
          <div class="description" itemprop="description">
            {this.org.description}
          </div>
        </div>
      </div>
      <div class="footer">
        <a href={`${this.org.html_url}?type=source`} target="_blank" rel="noopener" aria-label="Repos" title="Repos">
          <ion-icon name="logo-github" />
          <div>{this.org.public_repos}</div>
        </a>
        {(this.org.twitter_username?.length > 0) && <a itemprop="sameAs" href={`https://twitter.com/${this.org.twitter_username}`} target="_blank" rel="noopener" aria-label="Twitter Profile" title="Twitter Profile">
          <ion-icon name="logo-twitter" />
          <div>{this.org.twitter_username}</div>
        </a>}
        {(this.org.blog?.length > 0) && <a itemprop="sameAs" href={this.org.blog} target="_blank" rel="noopener" aria-label="Website" title="Website">
          <ion-icon name="globe-outline" />
          <div>{this.org.blog.replace('https://', '')}</div>
        </a>}
      </div>
    </Host>;
  }

}
