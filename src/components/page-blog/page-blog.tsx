import { Component, h, Host, State } from '@stencil/core';
import Helmet from '@stencil/helmet';
import blogContent from '../../assets/blog/list.json';
import { BlogPostInterface } from '../../global/definitions';
import { schema } from '../../global/schema';
import { defaults } from '../../global/store';

@Component({
  tag: 'page-blog',
  styleUrl: 'page-blog.scss',
  shadow: true
})
export class PageBlog {
  private title = "Blog";

  @State() posts: BlogPostInterface[];

  async componentWillLoad() {
    this.posts = blogContent as any;
  }

  render() {
    return <Host>
      <Helmet>
        <title>{this.title}</title>
        <meta property="og:title" content={this.title} />
        <meta name="keywords" content={defaults.keywords} />
        <meta name="description" content={defaults.description} />
        <meta property="og:description" content={defaults.description} />
        <meta name="twitter:description" content={defaults.description} />
        <meta property="og:image" content={defaults.image} />
        <meta name="twitter:title" content={this.title} />
        <meta name="twitter:image" content={defaults.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@adamlacombe" />
      </Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div class='app-home container'>
        {(this.posts && this.posts.length > 0) && <article>
          <h1>Blog Posts</h1>
          <div class="posts">
            {this.posts.map(post => <blog-card post={post} />)}
          </div>
        </article>}
      </div>
    </Host>;
  }
}
