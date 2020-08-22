import { Component, h, Host, Prop, State } from '@stencil/core';
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
    console.log(this.post);

    const req = await fetch(this.post.filePath);
    this.content = await req.json();
    console.log(this.content);
  }

  render() {
    return <Host>
      <div>
        <article class="post">
          <div class="image">
            <img src={this.post.img} alt="image" />
          </div>
          <div class="content">
            <h1>{this.post.title}</h1>
            {toHypertext(this.content.hypertext)}
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
