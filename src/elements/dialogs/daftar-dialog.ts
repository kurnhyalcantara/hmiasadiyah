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
          margin-bottom: 24px;
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
      <app-header-layout>
        <app-header slot="header" class="header" fixed="[[viewport.is]">
          <iron-icon class="close-icon" icon="hmi:arrow-left" on-tap="_close"></iron-icon>
        </app-header>
        <app-toolbar>
          <div class="dialog-header" layout vertical>
            <div class="header-content">[[title]]</div>
            <div hidden$="[[!errorOccurred]]" class="general-error">
              {$ daftarDialog.generalError $}
            </div>
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
            id="emailInput"
            on-touchend="_focus"
            label="{$ subscribeBlock.emailAddress $} *"
            value="{{email}}"
            required
            auto-validate$="[[validate]]"
            error-message="{$ subscribeBlock.emailRequired $}"
            autocomplete="off"
          >
          </paper-input>
          <div class="action-buttons" layout horizontal justified>
            <paper-button class="close-button" on-click="_closeDialog"
              >{$ subscribeBlock.close $}
            </paper-button>

            <paper-button
              on-click="_subscribe"
              ga-on="click"
              ga-event-category="attendees"
              ga-event-action="subscribe"
              ga-event-label="subscribe block"
              primary
            >
              [[submitLabel]]
            </paper-button>
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
      terdaftar: {
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
      secondFieldValue: String,
      firstFieldValue: String,
      initialHeight: Number,
      title: String,
      submitLabel: String,
      firstFieldLabel: String,
      secondFieldLabel: String,
      email: String,
    };
  }

  stateChanged(state: import('../../redux/store').State) {
    this.setProperties({
      terdaftar: state.terdaftar,
      ui: state.ui,
    });
  }

  static get observers() {
    return ['_handleDialogToggled(opened, data)', '_handleSubscribed(subscribed)'];
  }

  ready() {
    super.ready();
    this.initialHeight = window.innerHeight;
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
    this.addEventListener('iron-resize', this._resize);
    window.addEventListener('resize', this._windowResize.bind(this));
  }

  _close() {
    dialogsActions.closeDialog(DIALOGS.DAFTAR);
  }

  _handleSubscribed(subscribed) {
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

    this.title = data.title || '{$ subscribeBlock.formTitle $}';
    this.submitLabel = data.submitLabel || ' {$ subscribeBlock.subscribe $}';
    this.firstFieldLabel = data.firstFieldLabel || '{$ subscribeBlock.firstName $}';
    this.secondFieldLabel = data.secondFieldLabel || '{$ subscribeBlock.lastName $}';
    this._prefillFields(data);
  }

  _subscribe() {
    const emailInput = this.shadowRoot.querySelector('#emailInput');

    if (!emailInput.validate() || !this._validateEmail(emailInput.value)) {
      emailInput.invalid = true;
      return;
    }

    this.data.submit({
      email: this.email,
      firstFieldValue: this.firstFieldValue,
      secondFieldValue: this.secondFieldValue,
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
    const emailInput = this.shadowRoot.querySelector('#emailInput');
    firstField.value = userData ? userData.firstFieldValue : '';
    secondField.value = userData ? userData.secondFieldValue : '';
    firstField.focus();
    firstField.blur();
    secondField.focus();
    secondField.blur();
    emailInput.blur();
    emailInput.value = '';
    emailInput.invalid = false;
    this.validate = true;
  }

  _focus(e) {
    e.target.focus();
  }

  _windowResize() {
    this.keyboardOpened = this.ui.viewport.isPhone && window.innerHeight < this.initialHeight - 100;
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
