import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ReduxMixin } from '../../mixins/redux-mixin';
import { store } from '../../redux/store';
import 'plastic-image';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-icon';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import { dialogsActions, helperActions, userActions, daftarActions } from '../../redux/actions';
import { DIALOGS } from '../../redux/constants';
import '../hmi-icons';
import '../shared-styles';
import './dialog-styles';

class SigninDialog extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles dialog-styles flex flex-alignment">
        :host {
          --paper-input-container-underline: {
            display: none;
            height: 0;
          }
          --paper-input-container-underline-focus: {
            display: none;
            height: 0;
          }
        }

        .dialog-header {
          text-align: center;
        }

        app-toolbar,
        .dialog-content {
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

        .dialog-content {
          margin: 0 24px;
        }

        .action-input {
          padding: 16px 16px;
          box-shadow: 1px 1px 1px var(--default-primary-color),
            -1px -1px 2px var(--default-primary-color);
          border-radius: 12px;
        }

        .action-button {
          margin-top: 22px;
        }

        paper-input:not(:last-of-type) {
          margin-bottom: 18px;
        }

        .action-login {
          min-width: 75%;
          margin-bottom: 48px;
        }

        .action-register {
          margin-top: 14px;
        }

        .action-input iron-icon {
          margin-right: 12px;
          --iron-icon-width: 24px;
          --iron-icon-height: 24px;
        }

        .action-button iron-icon {
          margin-left: 8px;
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
          <iron-icon class="close-icon" icon="hmi:close" on-tap="_close"></iron-icon>
        </app-header>
        <app-toolbar layout vertical center>
          <div class="dialog-header" layout vertical center>
            <plastic-image
              class="header-logo"
              srcset="{$ signInProviders.logo $}"
              lazy-load
              preload
              fade
            ></plastic-image>
            <div class="container-title" layout vertical center>{$ signInProviders.title $}</div>
          </div>
        </app-toolbar>
        <div class="dialog-content" layout vertical justified>
          <div class="action-input">
            <paper-input
              id="email"
              label="{$ signInProviders.input.email $}"
              value="{{emailValue}}"
              no-label-float
            >
              <iron-icon icon="icons:mail" slot="prefix"></iron-icon>
            </paper-input>
            <paper-input
              id="password"
              label="{$ signInProviders.input.password $}"
              value="{{passValue}}"
              type="password"
              no-label-float
            >
              <iron-icon icon="icons:lock" slot="prefix"></iron-icon>
              <iron-icon icon="icons:visibility" slot="suffix" on-tap="_showPassword"></iron-icon>
            </paper-input>
          </div>
          <div class="action-button" layout vertical center>
            <paper-button
              class="action-login"
              on-click="_logIn"
              ga-on="click"
              ga-event-category="portal"
              ga-event-action="klik login"
              ga-event-label="login block"
              primary
            >
              {$ signInProviders.actions.login $}
            </paper-button>
            <div class="general-error" hidden$="[[!errorOccurred]]">
              [[errorMessage]]
            </div>
            <div>{$ signInProviders.info.p1 $}</div>
            <paper-button class="action-register" on-click="_newRegister" stroke>
              <span>{$ signInProviders.actions.newRegister $}</span>
              <iron-icon icon="hmi:arrow-right-circle"></iron-icon>
            </paper-button>
          </div>
        </div>
      </app-header-layout>
    `;
  }

  static get is() {
    return 'signin-dialog';
  }

  static get properties() {
    return {
      ui: {
        type: Object,
      },
      viewport: {
        type: Object,
      },
      user: {
        type: Object,
      },
      errorOccurred: {
        type: Boolean,
        value: false,
      },
      errorMessage: {
        type: String,
      },
      data: {
        type: Object,
      },
      innerHeight: Number,
      emailValue: String,
      passValue: String,
    };
  }

  stateChanged(state: import('../../redux/store').State) {
    this.setProperties({
      user: state.user,
      ui: state.ui,
      viewport: state.ui.viewport,
    });
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

  static get observers() {
    return ['_handleDialogToggled(opened, data)', '_userChanged(user)'];
  }

  _userChanged(user) {
    if (user.signedIn) {
      dialogsActions.closeDialog(DIALOGS.SIGNIN);
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

  _showPassword() {
    const passField = this.shadowRoot.querySelector('#password');
    passField.setAttribute('type', 'text');
  }

  _newRegister() {
    dialogsActions.openDialog(DIALOGS.DAFTAR);
    this._close();
  }

  _close() {
    dialogsActions.closeDialog(DIALOGS.SIGNIN);
  }

  _logIn() {
    userActions.signIn(this.emailValue, this.passValue);
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

window.customElements.define(SigninDialog.is, SigninDialog);
