import { Component, h, Host, Prop, State } from '@stencil/core';
import { Helmet } from '@stencil/helmet';
import blogContent from '../../assets/blog/list.json';
import { BlogPostInterface, MarkdownContent } from '../../global/definitions';
import { toHypertext } from '../../global/helpers';

@Component({
  tag: 'blog-post',
  styleUrl: 'blog-post.scss',
  shadow: true,
})
export class BlogPost {

  @Prop() page: string;
  @State() post: BlogPostInterface;
  @State() content: MarkdownContent;

  async componentWillLoad() {
    const posts: BlogPostInterface[] = blogContent as any;
    this.post = posts.find(el => el.url === this.page);

    const req = await fetch(this.post.filePath);
    this.content = await req.json();
  }

  render() {
    return <Host>
      <Helmet>
        <title>{this.content.title}</title>
        <meta name="keywords" content={this.post.tags.join(", ")} />
        <meta name="description" content={this.content.description} />
        <meta property="og:description" content={this.content.description} />
        <meta name="twitter:description" content={this.content.description} />
        <meta name="twitter:creator" content="@adamlacombe" />

        <meta property="og:image" content={this.post.img} />
        <meta name="twitter:image" content={this.post.img} />
        <meta property="og:type" content="blog" />
      </Helmet>
      <div>
        <article class="post">
          <div class="image">
            <al-img src={this.post.img} alt={this.post.title} />
          </div>
          <div class="content">
            <h1>{this.post.title}</h1>
            <div>{toHypertext(this.content.hypertext)}</div>
            <div class="meta">
              <div>
                <ion-icon name="calendar-sharp" />
                <time dateTime={new Date(this.post.date).toISOString().split('T')[0]}>{this.post.date}</time>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Host>;
  }

}
