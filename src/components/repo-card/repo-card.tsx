import { Component, h, Host, Prop } from '@stencil/core';
import repos from '../../assets/github/repos.json';
import { colors } from '../../global/colors';
import { IGithubRepo } from '../../global/definitions';

@Component({
  tag: 'repo-card',
  styleUrl: 'repo-card.scss',
  shadow: true,
})
export class RepoCard {

  @Prop({ mutable: true }) repo: IGithubRepo;
  @Prop() name: string;

  async componentWillLoad() {
    if (!this.repo && this.name) {
      this.repo = repos.find(el => el.full_name === this.name) as any;
    }
  }

  render() {
    if (!this.repo) return;

    return <Host style={{ '--language-color': (colors[this.repo.language]) ? colors[this.repo.language] : null }} itemscope itemtype="http://schema.org/SoftwareSourceCode">
      <div class="name" itemprop="name">
        <fa-icon type="fab" name="git-square" />
        <a href={this.repo.html_url} target="_blank" rel="noopener" itemprop="url">{(this.repo.owner.login === "adamlacombe") ? this.repo.name : this.repo.full_name}</a>
      </div>
      <div class="description" itemprop="description">
        {this.repo.description}
      </div>
      <div class="footer">
        {(this.repo.language && this.repo.language.length > 0) && <div>
          <span class="language" />
          <div itemprop="programmingLanguage">
            {this.repo.language}
          </div>
        </div>}
        <div>
          <ion-icon name="star-outline" />
          <div>{this.repo.stargazers_count}</div>
        </div>
        <div>
          <ion-icon name="git-branch-outline" />
          <div>{this.repo.forks_count}</div>
        </div>
      </div>
    </Host>;
  }

}
