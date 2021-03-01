import '@power-elements/lazy-image';
import { css, customElement, html, property, PropertyValues } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { setHeroSettings } from '../store/ui/actions';
import { ThemedElement } from './themed-element';

@customElement('hero-block')
export class HeroBlock extends ThemedElement {
  @property({ type: Boolean })
  active = false;
  @property({ type: String, attribute: 'background-image' })
  backgroundImage = '';
  @property({ type: String, attribute: 'background-color' })
  backgroundColor = '#fff';
  @property({ type: String, attribute: 'font-color' })
  fontColor = '#000';
  @property({ type: Boolean, attribute: 'hide-logo' })
  hideLogo = false;

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          margin-top: -56px;
          display: block;
          border-bottom: 1px solid var(--divider-color);
        }

        .hero-block {
          height: 100%;
          position: relative;
          color: inherit;
        }

        .hero-overlay {
          background-color: rgba(0, 0, 0, 0.6);
          opacity: 0;
          transition: opacity 0.3s;
          position: absolute;
        }

        .hero-overlay[show] {
          opacity: 1;
        }

        .hero-image {
          transition: background-color 0.3s;
          position: absolute;
          --lazy-image-fit: cover;
        }

        .container {
          padding: 0;
          width: 100%;
          height: unset;
          z-index: 0;
          position: unset;
        }

        .hero-content {
          padding: 80px 32px 32px;
          position: unset;
        }

        div ::slotted(.hero-title) {
          margin: 30px 0;
          font-size: 40px;
        }

        div ::slotted(.hero-description) {
          margin-bottom: 30px;
          max-width: 600px;
        }

        @media (min-width: 812px) {
          :host {
            margin-top: -64px;
          }

          .hero-content {
            padding-top: 120px;
            padding-bottom: 60px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div
        class="hero-block"
        style="${styleMap({ color: this.fontColor })}"
        layout
        start
        vertical
        center-justified
      >
        ${this.backgroundImage && this.image}
        <div class="hero-overlay" ?show="${!!this.backgroundImage}" fit></div>
        <div class="container">
          <div class="hero-content">
            <slot></slot>
          </div>
        </div>
      </div>
      <slot name="bottom"></slot>
    `;
  }

  private get image() {
    return html`
      <lazy-image
        class="hero-image"
        src="${this.backgroundImage}"
        style="${styleMap({ backgroundColor: this.backgroundColor })}"
        fit
      ></lazy-image>
    `;
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.active) {
      setHeroSettings({
        backgroundImage: this.backgroundImage,
        backgroundColor: this.backgroundColor,
        fontColor: this.fontColor,
        hideLogo: this.hideLogo,
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hero-block': HeroBlock;
  }
}
