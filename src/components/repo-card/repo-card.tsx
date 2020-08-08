import { Component, h, Host, Prop } from '@stencil/core';
import { colors } from '../../global/colors';
import { IGithubRepo } from '../../global/definitions';

@Component({
  tag: 'repo-card',
  styleUrl: 'repo-card.scss',
  shadow: true,
})
export class RepoCard {

  @Prop() repo: IGithubRepo;

  render() {
    return (
      <Host style={{
        '--language-color': colors[this.repo.language]
      }}>
        <div class="name">
          <fa-icon type="fab" name="git-square" />
          <a href={this.repo.html_url} target="_blank" rel="noopener">{this.repo.name}</a>
        </div>
        <div class="description">
          {this.repo.description}
        </div>
        <div class="footer">
          {(this.repo.language && this.repo.language.length > 0) && <div>
            <span class="language"></span>
            <div>
              {this.repo.language}
            </div>
          </div>}
          <div>
            <ion-icon name="star-outline"></ion-icon>
            <div>{this.repo.stargazers_count}</div>
          </div>
          <div>
            <ion-icon name="git-branch-outline"></ion-icon>
            <div>{this.repo.forks_count}</div>
          </div>
        </div>
      </Host>
    );
  }

}