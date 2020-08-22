import { Component, h, Host, Prop } from '@stencil/core';
import { BlogPostInterface } from '../../global/definitions';
import { clickRoutableLink } from '../../global/store';

@Component({
  tag: 'blog-card',
  styleUrl: 'blog-card.scss',
  shadow: true,
})
export class BlogCard {

  @Prop() post: BlogPostInterface;

  render() {
    return <Host>
      <div class="wrap">
        <div>
          <img src={this.post.img} alt={`${this.post.title}`} />
        </div>
        <div class="body">
          <div class="name" itemprop="name">
            <a href={this.post.url} onClick={(e) => clickRoutableLink(e)} itemprop="url">{this.post.title}</a>
          </div>
          <div class="description" itemprop="description">
            {this.post.description}
          </div>
        </div>
        <div class="meta">
          <div>
            <ion-icon name="calendar-sharp" />
            <time dateTime={new Date(this.post.date).toISOString().split('T')[0]}>{this.post.date}</time>
          </div>
          <div class="tags">
            {(this.post.tags && this.post.tags.length > 0) && this.post.tags.map(tag => <div>{tag}</div>)}
          </div>
        </div>
      </div>
    </Host>;
  }

}
