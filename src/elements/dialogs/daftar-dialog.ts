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
          --paper-input-container-focus-color: var(--default-primary-color);
          --paper-input-container-color: var(--secondary-text-color);
        }

        .dialog-header {
          width: 100%;
          padding: 32px 32px 16px;
          background: var(--primary-gradient);
          color: #fff;
          font-size: 20px;
          line-height: 1.5;
        }

        .dialog-container {
          background-color: var(--primary-background-color);
        }

        paper-input {
          margin: 16px 32px 0;
        }

        paper-input:first-of-type {
          margin-top: 0;
        }

        .action-buttons {
          margin: 32px 24px 24px;
        }

        .close-button {
          color: var(--secondary-text-color);
        }

        .general-error {
          margin: 0 32px;
          color: var(--error-color);
        }
      </style>
      <app-header-layout has-scrolling-region>
        <app-header slot="header" class="header" fixed="[[viewport.isTabletPlus]]">
          <iron-icon class="close-icon" icon="hmi:close" on-tap="_close"></iron-icon>
        </app-header>
        <app-toolbar>
          <div class="dialog-header" layout vertical>
            <div class="header-content">[[description]]</div>
          </div>
        </app-toolbar>
        <div class="dialog-container">
          <paper-input
            id="firstFieldInput"
            on-touchend="_focus"
            label="[[firstFieldLabel]]"
            value="{{firstFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="secondFieldInput"
            on-touchend="_focus"
            label="[[secondFieldLabel]]"
            value="{{secondFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="thirdFieldInput"
            on-touchend="_focus"
            label="[[thirdFieldLabel]]"
            value="{{thirdFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="fourthFieldInput"
            on-touchend="_focus"
            label="[[fourthFieldLabel]]"
            value="{{fourthFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="fifthFieldInput"
            on-touchend="_focus"
            label="[[fifthFieldLabel]]"
            value="{{fifthFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="sixthFieldInput"
            on-touchend="_focus"
            label="[[sixthFieldLabel]]"
            value="{{sixthFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="seventhFieldInput"
            on-touchend="_focus"
            label="[[seventhFieldLabel]]"
            value="{{seventhFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="eigthFieldInput"
            on-touchend="_focus"
            label="[[eigthFieldLabel]]"
            value="{{eigthFieldValue}}"
            autocomplete="off"
          >
          </paper-input>
          <paper-input
            id="emailInput"
            on-touchend="_focus"
            label="{$ formPendaftaran.emailAddress $} *"
            value="{{email}}"
            required
            auto-validate$="[[validate]]"
            error-message="{$ formPendaftaran.emailRequired $}"
            autocomplete="on"
          >
          </paper-input>
          <div class="action-buttons" layout horizontal justified>
            <paper-button class="close-button" on-click="_closeDialog"
              >{$ formPendaftaran.close $}
            </paper-button>

            <paper-button
              on-click="_daftar"
              ga-on="click"
              ga-event-category="pendaftaran"
              ga-event-action="klik daftar"
              ga-event-label="daftar block"
              primary
            >
              [[submitLabel]]
            </paper-button>
          </div>
          <div class="general-error" hidden="[[!errorOccurred]]">
            {$ formPendaftaran.generalError $}
          </div>
        </div>
      </app-header-layout>
    `;
  }

  static get is() {
    return 'daftar-dialog';
  }

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
      initialHeight: Number,
      title: String,
      description: String,
      firstFieldLabel: String,
      secondFieldLabel: String,
      thirdFieldLabel: String,
      fourthFieldLabel: String,
      fifthFieldLabel: String,
      sixthFieldLabel: String,
      seventhFieldLabel: String,
      eigthFieldLabel: String,
      submitLabel: String,
      firstFieldValue: String,
      secondFieldValue: String,
      thirdFieldValue: String,
      fourthFieldValue: String,
      fifthFieldValue: String,
      sixthFieldValue: String,
      seventhFieldValue: String,
      eigthFieldValue: String,
      email: String,
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
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
    // this.addEventListener('iron-resize', this._resize);
    // window.addEventListener('resize', this._windowResize.bind(this));
  }

  _close() {
    dialogsActions.closeDialog(DIALOGS.DAFTAR);
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

    this.title = data.title || '{$ formPendaftaran.formTitle $}';
    this.description = data.description || '{$ formPendaftaran.formDescription $}';
    this.firstFieldLabel = data.firstField || '{$ formPendaftaran.namaLengkap $}';
    this.secondFieldLabel = data.secondField || '{$ formPendaftaran.tanggalLahir $}';
    this.thirdFieldLabel = data.thirdField || '{$ formPendaftaran.alamatTinggal $}';
    this.fourthFieldLabel = data.fourthField || '{$ formPendaftaran.noWa $}';
    this.fifthFieldLabel = data.fifthField || '{$ formPendaftaran.fakultas $}';
    this.sixthFieldLabel = data.sixthField || '{$ formPendaftaran.prodi $}';
    this.seventhFieldLabel = data.seventhField || '{$ formPendaftaran.semester $}';
    this.eigthFieldLabel = data.eigthField || '{$ formPendaftaran.alasan $}';
    this.submitLabel = data.submitLabel || ' {$ formPendaftaran.daftar $}';
    this._prefillFields(data);
  }

  _daftar() {
    const emailInput = this.shadowRoot.querySelector('#emailInput');

    if (!emailInput.validate() || !this._validateEmail(emailInput.value)) {
      emailInput.invalid = true;
      return;
    }

    this.data.submit({
      email: this.email,
      firstFieldValue: this.firstFieldValue,
      secondFieldValue: this.secondFieldValue,
      thirdFieldValue: this.thirdFieldValue,
      fourthFieldValue: this.fourthFieldValue,
      fifthFieldValue: this.fifthFieldValue,
      sixthFieldValue: this.sixthFieldValue,
      seventhFieldValue: this.seventhFieldValue,
      eigthFieldValue: this.eigthFieldValue,
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

  _prefillFields(userData) {
    this.validate = false;
    const firstField = this.shadowRoot.querySelector('#firstFieldInput');
    const secondField = this.shadowRoot.querySelector('#secondFieldInput');
    const thirdField = this.shadowRoot.querySelector('#thirdFieldInput');
    const fourthField = this.shadowRoot.querySelector('#fourthFieldInput');
    const fifthField = this.shadowRoot.querySelector('#fifthFieldInput');
    const sixthField = this.shadowRoot.querySelector('#sixthFieldInput');
    const seventhField = this.shadowRoot.querySelector('#seventhFieldInput');
    const eigthField = this.shadowRoot.querySelector('#eigthFieldInput');
    const emailInput = this.shadowRoot.querySelector('#emailInput');
    firstField.value = userData ? userData.firstFieldValue : '';
    secondField.value = '';
    thirdField.value = '';
    fourthField.value = '';
    fifthField.value = '';
    sixthField.value = '';
    seventhField.value = '';
    eigthField.value = '';
    firstField.focus();
    firstField.blur();
    secondField.focus();
    secondField.blur();
    thirdField.focus();
    thirdField.blur();
    fourthField.focus();
    fourthField.blur();
    fifthField.focus();
    fifthField.blur();
    sixthField.focus();
    sixthField.blur();
    seventhField.focus();
    seventhField.blur();
    eigthField.focus();
    eigthField.blur();
    emailInput.blur();
    emailInput.value = '';
    emailInput.invalid = false;
    this.validate = true;
  }

  _focus(e) {
    e.target.focus();
  }

  // _windowResize() {
  //   this.keyboardOpened = this.ui.viewport.isPhone && window.innerHeight < this.initialHeight - 100;
  // }

  // _resize(e) {
  //   if (this.keyboardOpened) {
  //     const header = this.shadowRoot.querySelector('.dialog-header');
  //     const headerHeight = header.offsetHeight;

  //     setTimeout(() => {
  //       requestAnimationFrame(() => {
  //         this.style.maxHeight = `${this.initialHeight}px`;
  //         this.style.top = `-${headerHeight}px`;
  //       });
  //     }, 10);
  //   }
  // }
}

window.customElements.define(DaftarDialog.is, DaftarDialog);
