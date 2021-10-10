import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'al-img',
  styles: `
  al-img img {
    max-width: 100%;
  height: auto;
  }
  `
})
export class AlImage {

  @Prop({ mutable: true, reflect: true }) src: string;
  @Prop({ reflect: true }) alt: string;
  @Prop({ reflect: true }) width: string | number;
  @Prop({ reflect: true }) height: string | number;
  private SHARP_IMAGE_PROXY_URL = (window.location.origin.includes("localhost")) ? "http://localhost:8080" : "https://images.adamlacombe.com";

  private widths: number[] = [320, 640, 960, 1280, 2560];
  private types = [
    {
      type: "avif",
      quality: 35
    },
    {
      type: "webp",
      quality: 80
    }
  ];

  componentWillLoad() {
    if (!this.src.startsWith('http')) {
      this.src = `${window.location.origin}${(this.src)}`;
    }
  }

  render() {
    return <Host>
      <picture>
        {(!window.location.origin.includes('gitpod')) && this.types.map(type => this.widths.map(width => <source type={`image/${type.type}`} srcSet={`${this.SHARP_IMAGE_PROXY_URL}/?url=${this.src}&format=${type.type}&quality=${type.quality}&width=${width}`} media={`(max-width: ${width}px)`} />))}
        <img loading={'lazy'} src={this.src} alt={this.alt} />
      </picture>
    </Host>;
  }

}
