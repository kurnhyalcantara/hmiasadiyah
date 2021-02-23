import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import { html, PolymerElement } from '@polymer/polymer';
import { store } from '../../redux/store';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ReduxMixin } from '../../mixins/redux-mixin';
import { dialogsActions, daftarActions, userActions, helperActions } from '../../redux/actions';
import { DIALOGS } from '../../redux/constants';
import '../hmi-icons';
import '../shared-styles';
import './dialog-styles';

class DaftarDialog extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles dialog-styles flex flex-alignment">

        .dialog-header {
          text-align: center;
        }

        app-toolbar, .dialog-content {
          padding: 12px 0;
        }

        .header-logo {
          --iron-image-height: 62px;
        }

        .container-title {
          font-size: 22px;
          color: var(--primary-text-color);
          text-align: center;
        }

        .container-title::after {
          height: 3px;
          width: 50px;
        }

        .info-register {
          padding: 18px 24px;
          background: var(--focused-color);
          border-radius: 12px;
          border: 1px solid var(--default-primary-color);
          font-size: 14px;
          font-color: var(--default-primary-color);
        }

        paper-input:not(:last-of-type), paper-dropdown-menu {
          margin-bottom: 24px;
        }

        .dialog-content, .info-register {
          margin: 0 24px;
        }

        .section-title {
          margin: 18px 0;
        }

        .section-title-icon {
          --iron-icon-width: 24px;
          margin-right: 24px;
        }

        .section-title-label {

        }
        .section-input {
          padding: 0 0 0 52px;
        }

        .action-buttons {
          margin: 32px 24px 24px;
        }

        .close-button {
          color: var(--secondary-text-color);
        }

        .general-error {
          margin: 18px 0;
          text-align: center;
          font-size: 14px;
          color: var(--error-color);
        }
      </style>
      <app-header-layout has-scrolling-region>
        <app-header slot="header" class="header" fixed="[[viewport.isTabletPlus]]">
          <iron-icon class="close-icon" icon="hmi:close" on-tap="_closeDialog"></iron-icon>
        </app-header>
        <app-toolbar layout vertical center>
          <div class="dialog-header" layout vertical center>
            <plastic-image
              class="header-logo"
              srcset="{$ daftarProviders.logo $}"
              lazy-load
              preload
              fade
            ></plastic-image>
            <div class="container-title" layout vertical center>{$ daftarProviders.header $}</div>
            <div class="info-register">{$ daftarProviders.info $}</div>
          </div>
        </app-toolbar>
        <div class="dialog-content">
          <div class="section-title">
            <iron-icon class="section-title-icon" icon="icons:{$ daftarProviders.title.informasidiri.icon $}"></iron-icon>
            <span class="section-title-label">{$ daftarProviders.title.informasidiri.label $}</span>
          </div>
          <div class="section-input">
            <paper-input
              id="namaLengkap"
              label="{$ daftarProviders.input.fullName.label $}"
              placeholder="{$ daftarProviders.input.fullName.placeholder $}"
              value="{{namaLengkapValue}}"
              autocomplete="on"
              always-float-label
              required
              auto-validate$="[[validate]]"
            >
            </paper-input>
            <paper-dropdown-menu id="jenisKelaminDrop" label="{$ daftarProviders.input.jenisKelamin.placeholder $}" required>
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>{$ daftarProviders.input.jenisKelamin.value.pria $}</paper-item>
                <paper-item>{$ daftarProviders.input.jenisKelamin.value.wanita $}</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-input
              id="tanggalLahir"
              type="date"
              label="{$ daftarProviders.input.tanggalLahir.label $}"
              placeholder="{$ daftarProviders.input.tanggalLahir.placeholder $}"
              value="{{tanggalLahirValue}}"
              autocomplete="on"
              always-float-label
              required
              auto-validate$="[[validate]]"
            >
            </paper-input>
            <paper-input
              id="tempatLahir"
              label="{$ daftarProviders.input.tempatLahir.label $}"
              placeholder="{$ daftarProviders.input.tempatLahir.placeholder $}"
              value="{{tempatLahirValue}}"
              autocomplete="on"
              always-float-label
              required
              auto-validate$="[[validate]]"
            >
            </paper-input>
            <paper-input
              id="alamatSekarang"
              label="{$ daftarProviders.input.alamatSekarang.label $}"
              placeholder="{$ daftarProviders.input.alamatSekarang.placeholder $}"
              value="{{alamatSekarangValue}}"
              autocomplete="on"
              always-float-label
              required
              auto-validate$="[[validate]]"
            >
            </paper-input>
            <paper-input
              id="noWa"
              label="{$ daftarProviders.input.noWa.label $}"
              placeholder="{$ daftarProviders.input.noWa.placeholder $}"
              value="{{noWaValue}}"
              autocomplete="on"
              always-float-label
              required
              pattern="[0-9]*"
              auto-validate$="[[validate]]"
            >
            </paper-input>
            <paper-input
              id="instagram"
              label="{$ daftarProviders.input.instagram.label $}"
              placeholder="{$ daftarProviders.input.instagram.placeholder $}"
              value="{{instagramValue}}"
              autocomplete="on"
              always-float-label
            >
            </paper-input>
          </div>
          <div class="section-title">
            <iron-icon class="section-title-icon" icon="icons:{$ daftarProviders.title.jenjangStudi.icon $}"></iron-icon>
            <span class="section-title-label">{$ daftarProviders.title.jenjangStudi.label $}</span>
          </div>
          <div class="section-input">
            <paper-dropdown-menu id="fakultasDrop" label="{$ daftarProviders.input.fakultas.placeholder $}" required>
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>{$ daftarProviders.input.fakultas.value.ftk $}</paper-item>
                <paper-item>{$ daftarProviders.input.fakultas.value.fudk $}</paper-item>
                <paper-item>{$ daftarProviders.input.fakultas.value.fsh $}</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-dropdown-menu id="jurusanDrop" label="{$ daftarProviders.input.jurusan.placeholder $}" required>
              <paper-listbox slot="dropdown-content" selected="0">
                <paper-item>{$ daftarProviders.input.jurusan.value.pai $}</paper-item>
                <paper-item>{$ daftarProviders.input.jurusan.value.tbi $}</paper-item>
                <paper-item>{$ daftarProviders.input.jurusan.value.afi $}</paper-item>
                <paper-item>{$ daftarProviders.input.jurusan.value.as $}</paper-item>
                <paper-item>{$ daftarProviders.input.jurusan.value.hes $}</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-input
              id="semester"
              label="{$ daftarProviders.input.semester.label $}"
              placeholder="{$ daftarProviders.input.semester.placeholder $}"
              value="{{semesterValue}}"
              autocomplete="on"
              always-float-label
            >
            </paper-input>
          </div>
          <div class="section-title">
            <iron-icon class="section-title-icon" icon="icons:{$ daftarProviders.title.infoAkun.icon $}"></iron-icon>
            <span class="section-title-label">{$ daftarProviders.title.infoAkun.label $}</span>
          </div>
          <div class="section-input">
            <paper-input
              id="emailUser"
              label="{$ daftarProviders.input.email.label $}"
              placeholder="{$ daftarProviders.input.email.placeholder $}"
              value="{{emailValue}}"
              autocomplete="on"
              required
              auto-validate$="[[validate]]"
              error-message="{$ daftarProviders.input.email.errorOccured $}"
              always-float-label
            >
            </paper-input>
            <paper-input
              id="passwordUser"            
              label="{$ daftarProviders.input.password.label $}"
              required
              placeholder="{$ daftarProviders.input.password.placeholder $}" 
              minlength="6"
              auto-validate$="[[validate]]"
              error-message="{$ daftarProviders.input.password.errorOccured $}"
              value="{{passwordValue}}"
              autocomplete="off"
              type="password"
              always-float-label
            >
            </paper-input>
          </div>
          <div class="general-error" hidden$="[[!errorOccurred]]">
            [[errorMessage]]
          </div>
          <div class="action-buttons" layout horizontal justified>
            <paper-button class="close-button" on-click="_closeDialog"
              >{$ daftarProviders.cancel $}
            </paper-button>
            <paper-button
              on-click="_daftar"
              ga-on="click"
              ga-event-category="pendaftaran"
              ga-event-action="klik daftar"
              ga-event-label="daftar block"
              primary
            >
             {$ daftarProviders.submit $}
            </paper-button>
          </div>
        </div>
      </app-header-layout>
    `;
  }

  static get is() {
    return 'daftar-dialog';
  }

  private namaLengkapValue: string;
  private tanggalLahirValue: string;
  private tempatLahirValue: string;
  private alamatSekarangValue: string;
  private noWaValue: string;
  private instagramValue: string;
  private semesterValue: string;
  private emailValue: string;
  private passwordValue: string;

  static get properties() {
    return {
      ui: {
        type: Object,
      },
      viewport: {
        type: Object,
      },
      pendaftaran: {
        type: Boolean
      },
      validate: {
        type: Boolean,
        value: true,
      },
      errorOccurred: {
        type: Boolean,
        value: false,
      },
      errorMessage: {
        type: String
      },
      keyboardOpened: {
        type: Boolean,
        value: false,
      },
      data: {
        type: Object
      },
      initialHeight: Number,
      namaLengkapValue: String,
      jenisKelaminValue: String,
      tanggalLahirValue: String,
      tempatLahirValue: String,
      alamatSekarangValue: String,
      noWaValue: String,
      instagramValue: String,
      fakultasValue: String,
      jurusanValue: String,
      semesterValue: String,
      emailValue: String,
      passwordValue: String,
    };
  }

  stateChanged(state: import('../../redux/store').State) {
    this.setProperties({
      pendaftaran: state.pendaftaran,
      ui: state.ui,
      viewport: state.ui.viewport,
    });
  }

  static get observers() {
    return ['_handleDialogToggled(opened, data)', '_handleTerdaftar(pendaftaran)'];
  }

  ready() {
    super.ready();
    this.initialHeight = window.innerHeight;
    this.addEventListener('iron-resize', this._resize);
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
  }

  _handleTerdaftar(pendaftaran) {
    if (pendaftaran) {
      this._closeDialog();

    }
  }

  _handleDialogToggled(opened, data) {
    if (data) {
      this.errorOccurred = data.errorOccurred;
      this.errorMessage = data.errorMessage;
    } else {
      data = {};
    }
  }

  _closeDialog() {
    dialogsActions.closeDialog(DIALOGS.DAFTAR);
  }

  _resize(e) {
    if (this.keyboardOpened) {
      const header = this.shadowRoot.querySelector('.dialog-header');
      const headerHeight = header.offsetHeight;

      setTimeout(() => {
        requestAnimationFrame(() => {
          this.style.maxHeight = `${this.initialHeight}px`;
          this.style.top = `-${headerHeight}px`;
        });
      }, 10);
    }
  }

  _daftar() {
    const jenisKelaminInput = this.shadowRoot.querySelector('#jenisKelaminDrop');
    const fakultasInput = this.shadowRoot.querySelector('#fakultasDrop');
    const jurusanInput = this.shadowRoot.querySelector('#jurusanDrop');

    daftarActions.signUp(this.emailValue, this.passwordValue);
    this._submit({
      namaLengkapValue: this.namaLengkapValue,
      jenisKelaminValue: jenisKelaminInput.value,
      tanggalLahirValue: this.tanggalLahirValue,
      tempatLahirValue: this.tempatLahirValue,
      alamatSekarangValue: this.alamatSekarangValue,
      noWaValue: this.noWaValue,
      instagramValue: this.instagramValue,
      fakultasValue: fakultasInput.value,
      jurusanValue: jurusanInput.value,
      semesterValue: this.semesterValue,
      emailValue: this.emailValue
    });
  }

  _submit(data) {
    store.dispatch(helperActions.storeData(data));
  }

}


window.customElements.define(DaftarDialog.is, DaftarDialog);
