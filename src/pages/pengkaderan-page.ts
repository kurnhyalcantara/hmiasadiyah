import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/paper-button';
import '../elements/footer-block';
import '../elements/gabung-block';
import '../elements/hero-block';
import '../elements/md-content';
import '../elements/polymer-helmet';
import '../elements/shared-styles';
import { dialogsActions, daftarActions } from '../redux/actions';
import { store } from '../redux/store';
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

        .info-up {
          padding: 8px;
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
      <gabung-block></gabung-block>
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
    dialogsActions.openDialog(DIALOGS.DAFTAR, {
      title: '{$ formPendaftaran.formTitle $}',
      description: '{$ formPendaftaran.formDescription $}',
      firstField: '{$ formPendaftaran.namaLengkap $}',
      secondField: '{$ formPendaftaran.tanggalLahir $}',
      thirdField: '{$ formPendaftaran.alamatTInggal $}',
      fourthField: '{$ formPendaftaran.noWa $}',
      fifthField: '{$ formPendaftaran.fakultas $}',
      sixthField: '{$ formPendaftaran.prodi $}',
      seventhField: '{$ formPendaftaran.semester $}',
      eigthField: '{$ formPendaftaran.alasan $}',
      submitLabel: ' {$ formPendaftaran.daftar $}',
      submit: (data) => this._daftarAction(data),
    });
  }

  _daftarAction(data) {
    store.dispatch(daftarActions.subscribe(data));
  }
}

window.customElements.define(PengkaderanPage.is, PengkaderanPage);
