import { Component, h, Host, Prop, State } from '@stencil/core';
import { Helmet } from '@stencil/helmet';
import postContent from '../../assets/blog/introduction-to-docker.json';
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
  @State() structuredData: any;

  async componentWillLoad() {
    const posts: BlogPostInterface[] = blogContent as any;
    this.post = posts.find(el => el.url === this.page);

    //const req = await fetch(this.post.filePath);
    this.content = postContent as any;

    this.structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": this.post.url
      },
      "headline": this.post.title,
      "description": this.post.description,
      "image": [
        this.post.img
      ],
      "datePublished": new Date(this.post.date).toISOString().split('T')[0],
      "author": {
        "@type": "Person",
        "name": "Adam LaCombe"
      },
      "publisher": {
        "@type": "Person",
        "name": "Adam LaCombe"
      }
    };
  }

  render() {
    if (!(this.post && this.content)) return;

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

        <script type="application/ld+json">{JSON.stringify(this.structuredData)}</script>
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
