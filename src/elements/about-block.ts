import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './hmi-icons';

@customElement('about-block')
export class AboutBlock extends ReduxMixin(PolymerElement) {
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

        .center-align {
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
        <div class="container-title" layout vertical center>{$ aboutBlock.title $}</div>
        <div class="content">
          <div class="center-align">
            <plastic-image
              srcset="{$ aboutBlock.logo $}"
              alt="{$ title $}"
              lazy-load
              preload
              fade
            ></plastic-image>
          </div>
          <div class="content-text" layout vertical center>
            <p class="center-align">{$ aboutBlock.content $}</p>
            <a href="/profile">
              <paper-button class="animated icon-right" stroke>
                <span>{$ aboutBlock.selengkapnya.label $}</span>
                <iron-icon icon="hmi:arrow-right-circle"></iron-icon>
              </paper-button>
            </a>
          </div>
          <div class="content-founder" layout vertical center>
            <plastic-image
              srcset="{$ aboutBlock.pendiri.image $}"
              lazy-load
              preload
              fade
            ></plastic-image>
            <div><strong>{$ aboutBlock.pendiri.name $}</strong></div>
            <div>{$ aboutBlock.pendiri.desc $}</div>
          </div>
        </div>
      </div>
    `;
  }
}

