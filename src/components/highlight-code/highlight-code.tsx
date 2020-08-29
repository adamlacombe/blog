import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { colors } from '../../global/colors';

@Component({
  tag: 'highlight-code',
  styleUrl: 'highlight-code.scss'
})
export class HighlightCode {
  private colors = Object.keys(colors).map(k => ({
    originalKey: k,
    key: k.toLowerCase(),
    value: colors[k]
  }));
  @Element() el!: HTMLElement;
  @Prop() language: string;
  @State() color: string;
  @State() languageName: string;

  @State() showCopied: boolean;

  componentWillLoad() {
    const l = this.colors.find(el => el.key === this.language.toLowerCase());
    this.color = l?.value;
    this.languageName = l?.originalKey || this.language;
  }

  copyCode() {
    navigator.clipboard.writeText(this.el.querySelector('code').innerText);
    this.showCopied = true;
    setTimeout(() => this.showCopied = false, 3000);
  }

  render() {
    return <Host style={{ '--language-color': (this.color) ? this.color : null }}>
      <slot />
      <div class="code-footer">
        {this.showCopied
          ? <div class="success">
            <ion-icon name="checkmark-done-outline" /> Copied
          </div>
          : <div onClick={() => this.copyCode()}>
            <ion-icon name="clipboard-outline" /> Copy
          </div>}

        <div>
          <span class="language" />
          <div>
            {this.languageName}
          </div>
        </div>
      </div>
    </Host>
  }
}