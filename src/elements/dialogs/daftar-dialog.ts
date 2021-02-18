import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ReduxMixin } from '../../mixins/redux-mixin';
import { dialogsActions } from '../../redux/actions';
import { DIALOGS } from '../../redux/constants';
import '../hmi-icons';
import '../shared-styles';
import './dialog-styles';

class DaftarDialog extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles dialog-styles flex flex-alignment">
        :host {

        }

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

        paper-input:not(:last-of-type) {
          margin-bottom: 24px;
        }

        .dialog-content, .info-register {
          margin: 0 24px;
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
            <div class="container-title" layout vertical center>{$ daftarProviders.title $}</div>
            <div class="info-register">{$ daftarProviders.info $}</div>
            <div class="general-error">
              {$ daftarProviders.generalError $}
            </div>
          </div>
        </app-toolbar>
        <div class="dialog-content">
          <paper-input
            id="namaLengkap"
            label="{$ daftarProviders.input.fullName.label $}"
            placeholder="{$ daftarProviders.input.fullName.placeholder $}"
            required
            value="{{namaLengkapValue}}"
            autocomplete="on"
            always-float-label
          >
          </paper-input>
          <paper-input
            id="usernameUser"            
            label="{$ daftarProviders.input.username.label $}"
            placeholder="{$ daftarProviders.input.username.placeholder $}"
            required
            value="{{usernameValue}}"
            auto-validate$="[[validateUser]]"
            error-message="{$ formPendaftaran.usernameError $}"
            autocomplete="on"
            always-float-label
          >
          </paper-input>
          <paper-input
            id="emailUser"
            label="{$ daftarProviders.input.email.label $}"
            placeholder="{$ daftarProviders.input.email.placeholder $}"
            value="{{emailValue}}"
            autocomplete="on"
            required
            auto-validate$="[[validateEmail]]"
            error-message="{$ formPendaftaran.emailRequired $}"
            always-float-label
          >
          </paper-input>
          <paper-input
            id="passwordUser"            
            label="{$ daftarProviders.input.password.label $}"
            required
            placeholder="{$ daftarProviders.input.password.placeholder $}"
            char-counter 
            minlength="6"
            auto-validate$="[[validatePass]]"
            error-message="{$ formPendaftaran.passwordError $}"
            value="{{passwordValue}}"
            autocomplete="off"
            type="password"
            always-float-label
          >
          </paper-input>
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
  private emailValue: string;
  private usernameValue: string;
  private passwordValue: string;

  static get properties() {
    return {
      ui: {
        type: Object,
      },
      viewport: {
        type: Object,
      },
      subscribed: {
        type: Boolean,
      },
      validate: {
        type: Boolean,
        value: true,
      },
      errorOccurred: {
        type: Boolean,
        value: false,
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
      emailValue: String,
      usernameValue: String,
      passwordValue: String,
    };
  }

  stateChanged(state: import('../../redux/store').State) {
    this.setProperties({
      subscribed: state.subscribed,
      ui: state.ui,
      viewport: state.ui.viewport,
    });
  }

  static get observers() {
    return ['_handleDialogToggled(opened, data)', '_handleTerdaftar(subscribed)'];
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

  _handleTerdaftar(subscribed) {
    if (subscribed) {
      this._closeDialog();
    }
  }

  _handleDialogToggled(opened, data) {
    if (data) {
      this.errorOccurred = data.errorOccurred;
    } else {
      data = {};
    }
  }

  _daftar() {
    this.data.submit({
      namaLengkapValue: this.namaLengkapValue,
      emailValue: this.emailValue,
      usernameValue: this.usernameValue,
      passwordValue: this.passwordValue
    });
  }

  _validateEmail(email) {
    // https://stackoverflow.com/a/742588/26406
    const emailRegularExpression = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
    return emailRegularExpression.test(email);
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
}

window.customElements.define(DaftarDialog.is, DaftarDialog);
