import { Component, h, Host, Prop, State } from '@stencil/core';
import { Helmet } from '@stencil/helmet';
import { TechArticle, WithContext } from 'schema-dts';
import blogContent from '../../assets/blog/list.json';
import { BlogPostInterface, MarkdownContent } from '../../global/definitions';
import { SHARP_IMAGE_PROXY_URL, toHypertext } from '../../global/helpers';
import { SCHEMA_ME_ID, SCHEMA_WEBSITE_ID } from '../../global/schema';

@Component({
  tag: 'blog-post',
  styleUrl: 'blog-post.scss',
  shadow: true,
})
export class BlogPost {

  @Prop() page: string;
  @State() post: BlogPostInterface;
  @State() content: MarkdownContent;
  @State() structuredData: WithContext<TechArticle> = {} as any;

  async componentWillLoad() {
    this.post = blogContent.find(el => el.url === this.page);
    this.content = this.post;

    if (this.post && this.content) {
      this.structuredData = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        mainEntityOfPage: {
          "@id": SCHEMA_WEBSITE_ID,
        },
        headline: this.post.title,
        description: this.post.description,
        image: this.post.img,
        datePublished: new Date(this.post.date).toISOString().split('T')[0],
        author: {
          "@id": SCHEMA_ME_ID,
        },
        publisher: {
          "@id": SCHEMA_ME_ID,
        }
      };
    }
  }

  render() {
    if (!(this.post && this.content)) return;

    return <Host>
      <Helmet>
        <title>{this.content.title}</title>
        <meta property="og:title" content={this.content.title} />
        <meta name="keywords" content={this.post.tags.join(", ")} />
        <meta name="description" content={this.content.description} />
        <meta property="og:description" content={this.content.description} />
        <meta name="twitter:description" content={this.content.description} />
        <meta property="og:image" content={`${SHARP_IMAGE_PROXY_URL}/?url=${window.location.origin}${this.post.img}&width=1280&height=640`} />
        <meta name="twitter:title" content={this.content.title} />
        <meta name="twitter:image" content={`${SHARP_IMAGE_PROXY_URL}/?url=${window.location.origin}${this.post.img}&width=1280&height=640`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@adamlacombe" />
      </Helmet>
      <script type="application/ld+json">{JSON.stringify(this.structuredData)}</script>
      <div>
        <article class="post">
          <div class="container">
            <div class="content">
              <div class="image">
                <al-img src={this.post.img} alt={this.post.title} />
              </div>
              <div class="inner-content">
                <h1>{this.post.title}</h1>
                <div>{toHypertext(this.content.hypertext)}</div>
                <div class="meta">
                  <div>
                    <ion-icon name="calendar-sharp" />
                    <time dateTime={new Date(this.post.date).toISOString().split('T')[0]}>{this.post.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Host>;
  }

}
