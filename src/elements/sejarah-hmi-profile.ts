import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';

class SejarahHMIProfile extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          border-bottom: 1px solid var(--default-primary-color);
        }

        .container {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 30px;
          min-height: 80%;
        }

        .content {
          width: 100%;
        }

        .content-desc {
          width: 100%;
          padding: 20px;
          border-left-width: 2px;
          border-left-style: dotted;
          border-left-color: var(--default-primary-color);
        }

        .content-content {
          text-align: left;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          flex-direction: row;
        }

        .icon-attr {
          color: var(--default-primary-color);
          display: inline-flex;
          -webkit-box-flex: 0;
          flex: 0 0 auto;
          margin-right: 10px;
        }

        h3 {
          margin-block-start: 0;
          margin-block-end: 0;
          color: var(--default-primary-color);
        }

        p {
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
        }

        @media (min-width: 640px) {
          .container {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          }
        }
      </style>
      <div class="container-title" layout vertical center>{$ sejarahHMIProfileBlock.title $}</div>
      <div class="container">
        <div class="content" layout vertical center>
          <plastic-image
            class="image-logo"
            srcset="{$ sejarahHMIProfileBlock.image $}"
          ></plastic-image>
          <div class="divider-element"></div>
          {% for prof in sejarahHMIProfileBlock.content %}
          <div class="content" layout vertical>
            <div class="content-content" layout horizontal>
              <iron-icon class="icon-attr" icon="hmi:{$ prof.icon $}" role="img"></iron-icon>
              <div class="content" layout vertical>
                <h3>{$ prof.title $}</h3>
                <p>{$ prof.description $}</p>
              </div>
            </div>
          </div>
          {% endfor %}
        </div>
        <div class="content-desc" layout vertical>
          {% for profdesc in sejarahHMIProfileBlock.profileDescription %}
          <p>{$ profdesc.alinea $}</p>
          {% endfor %}
        </div>
      </div>
    `;
  }

  static get is() {
    return 'sejarah-hmi-profile';
  }
}

window.customElements.define(SejarahHMIProfile.is, SejarahHMIProfile);
