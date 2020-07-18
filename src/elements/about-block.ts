import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './hmi-icons';
import './shared-animations';

class AboutBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment flex-reverse">
        :host {
          display: block;
          border-bottom: 1px solid var(--divider-color);
        }

        .content {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(300px, auto));
        }

        .container-title {
          text-align: center;
        }

        .content-align {
          text-align: center;
        }

        .logo {
          margin-top: 12px;
        }

        paper-button[stroke] {
          margin: 12px 0;
          color: var(--default-primary-color);
          background: var(--primary-background-color);
          border: 1px solid var(--default-primary-color);
        }

        @media (min-width: 760px) {
          .content {
            grid-template-columns: 170px auto 200px;
          }
        }
      </style>

      <div class="container">
        <div class="container-title" layout vertical center>{$ aboutHmi.title $}</div>
        <div class="content">
          <div class="content-align">
            <plastic-image srcset="/images/logos/about-logo.png" alt="{$ title $}"></plastic-image>
          </div>
          <div class="content-align">
            <div class="content-text">{$ aboutHmi.content $}</div>
            <a href="{$ aboutHmi.selengkapnya.link $}">
              <paper-button class="animated icon-right" stroke>
                <span>{$ aboutHmi.selengkapnya.label $}</span>
                <iron-icon icon="hmi:arrow-right-circle"></iron-icon>
              </paper-button>
            </a>
          </div>
          <div class="content-align">
            <plastic-image srcset="{$ aboutHmi.pendiri.image $}"></plastic-image>
            <h3><strong>{$ aboutHmi.pendiri.name $}</strong></h3>
            <div>{$ aboutHmi.pendiri.desc $}</div>
          </div>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'about-block';
  }
}

window.customElements.define(AboutBlock.is, AboutBlock);
