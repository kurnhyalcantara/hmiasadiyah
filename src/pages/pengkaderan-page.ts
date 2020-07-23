import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/paper-button';
import '../elements/footer-block';
import '../elements/hero-block';
import '../elements/md-content';
import '../elements/polymer-helmet';
import '../elements/shared-styles';
import { dialogsActions } from '../redux/actions';
import { DIALOGS } from '../redux/constants';

class PengkaderanPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
        }

        .container {
          padding: 16px 16px;
        }

        .action-button {
          width: 100%;
          text-align: center;
        }

        .brosur-pengkaderan {
          display: block;
          --iron-image-width: 100%;
        }

        @media (min-width: 640px) {
          .action-button {
            width: 25%;
            text-align: left;
          }
        }
      </style>

      <polymer-helmet
        title="{$ heroSettings.pengkaderan.title $} | {$ title $}"
        description="{$ heroSettings.pengkaderan.metaDescription $}"
        active="[[active]]"
      ></polymer-helmet>

      <hero-block
        background-image="{$ heroSettings.pengkaderan.background.image $}"
        background-color="{$ heroSettings.pengkaderan.background.color $}"
        font-color="{$ heroSettings.pengkaderan.fontColor $}"
        active="[[active]]"
      >
        <div class="hero-title">{$ heroSettings.pengkaderan.title $}</div>
        <paper-button class="action-button" on-tap="_showDialog" primary>{$ signUp $}</paper-button>
      </hero-block>
      <div class="container" layout vertical center>
        <div class="info-up" hidden$="[[isPengkaderanTidakAda]]">{$ noPengkaderan $}</div>
        <plastic-image
          class="brosur-pengkaderan"
          srcset="{$ brosurPengkaderan $}"
          alt="{$ title $}"
        ></plastic-image>
      </div>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'pengkaderan-page';
  }

  static get properties() {
    return {
      active: Boolean,
      isPengkaderanTidakAda: {
        type: Boolean,
        value: false,
      },
    };
  }

  _showDialog() {
    dialogsActions.openDialog(DIALOGS.DAFTAR);
  }
}

window.customElements.define(PengkaderanPage.is, PengkaderanPage);
