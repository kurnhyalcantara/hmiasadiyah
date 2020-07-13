import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './hoverboard-icons';
import './shared-animations';

class UnggulBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment flex-reverse">
        :host {
          display: block;
          border-bottom: 1px solid var(--divider-color);
        }

        .content {
          display: grid;
          grid-gap: 26px;
          grid-template-columns: repeat(auto-fit, minmax(300px, auto));
        }

        .container-title {
          text-align: center;
        }

        .row {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          max-width: 100%;
          width: 80%;
          padding: 0.5rem;
          margin: 0 auto 1.5em;
        }

        .content-title {
          margin-top: 15px;
          font-size: 26px;
        }

        p {
          text-align: center;
        }

        .big-icon {
          color: var(--default-primary-color);
        }

        @media (min-width: 760px) {
          .content {
            grid-template-columns: auto auto auto;
          }
        }
      </style>

      <div class="container">
        <div class="container-title" layout vertical center>{$ unggulBlock.title $}</div>
        <div class="content">
          {% for ung in unggulBlock.content %}
          <div class="card">
            <div class="row" layout vertical center>
              <iron-icon class="big-icon" icon="hoverboard:{$ ung.icon $}" role="img"></iron-icon>
              <div class="content-title">{$ ung.title $}</div>
              <p>{$ ung.desc $}</p>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>
    `;
  }

  static get is() {
    return 'unggul-block';
  }
}

window.customElements.define(UnggulBlock.is, UnggulBlock);
