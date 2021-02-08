import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './hmi-icons';
import './shared-styles';

class GabungBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: flex;
          width: 100%;
          background: var(--primary-gradient);
          color: #fff;
          padding: 16px 0;
        }

        .images {
          height: 100%;
          margin: 8px 8px;
        }

        .description {
          font-size: 24px;
          margin: 0 0 16px;
          text-align: center;
        }

        @media (min-width: 640px) {
          :host {
            padding: 32px 0;
          }

          .images {
            height: 100%;
          }

          .description {
            font-size: 32px;
            margin: 0 0 24px;
          }
        }
      </style>

      <div class="container" layout vertical center>
        <plastic-image class="images" srcset="{$ gabungBlock.image $}"></plastic-image>
        <div class="description">
          {$ gabungBlock.callToAction.description $}
        </div>
        <div>
          <paper-button
            class="animated icon-right"
            on-click="_daftar"
            ga-on="click"
            ga-event-category="pendaftar"
            ga-event-action="daftar"
            ga-event-label="daftar block"
            stroke
          >
            <span class="cta-label">{$ infoPengkaderan $}</span>
            <iron-icon icon="hmi:arrow-right-circle"></iron-icon>
          </paper-button>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'gabung-block';
  }

}

window.customElements.define(GabungBlock.is, GabungBlock);
