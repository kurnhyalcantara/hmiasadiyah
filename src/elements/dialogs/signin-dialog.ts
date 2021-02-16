import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ReduxMixin } from '../../mixins/redux-mixin';
import 'plastic-image';
import '@polymer/paper-input/paper-input'
import '@polymer/iron-icon';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import { dialogsActions, helperActions, userActions } from '../../redux/actions';
import { DIALOGS } from '../../redux/constants';
import '../hmi-icons';
import '../shared-styles';
import './dialog-styles';

class SigninDialog extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles dialog-styles flex flex-alignment">
        :host {
          margin: 0;
          padding: 0;
          display: block;
          background: var(--primary-background-color);
          box-shadow: var(--box-shadow);
          --paper-input-container-underline: { display: none; height: 0;};
          --paper-input-container-underline-focus: { display: none; height: 0;};
          --paper-input-container-focus-color: var(--default-primary-color);
          --paper-input-container-color: var(--secondary-text-color);
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

        .dialog-content {
          margin: 0 24px;
        }

        .action-input {
          padding: 16px 16px;
          box-shadow: 1px 1px 1px var(--default-primary-color), -1px -1px 2px var(--default-primary-color);
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

        .no-account {
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          line-spacing: 1.0;
        }

        .action-info {
          margin-top: 14px;
        }

        .sign-in-button {
          padding: 16px 0;
          text-align: center;
          display: block;
          color: var(--primary-text-color);
        }

        .merge-content .subtitle,
        .merge-content .explanation {
          margin-bottom: 16px;
        }

        iron-icon {
          margin-right: 12px;
          --iron-icon-width: 24px;
          --iron-icon-height: 24px;
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
        <div class="dialog-content" layout vertical>
          <div class="action-input">
            <paper-input id="email" label="Email" no-label-float>
              <iron-icon icon="icons:mail" slot="prefix"></iron-icon>
            </paper-input>
            <paper-input id="password" label="Password" type="password" no-label-float>
              <iron-icon icon="icons:lock" slot="prefix"></iron-icon>
            </paper-input>
          </div>
          <div class="action-button" layout vertical center>
            <paper-button
              class="action-login"
              on-click="_lgon"
              ga-on="click"
              ga-event-category="portal"
              ga-event-action="klik login"
              ga-event-label="login block"
              primary
            >
              Login
            </paper-button>
            <div>Belum punya akun?</div>
            <div class="no-account">Silahkan ikuti pengkaderan Basic Training di HMI Komisariat As'adiyah</div>
            <a href="/kaderisasi">
              <paper-button class="action-info" stroke>
                {$ infoPengkaderan $}
                <iron-icon icon="hmi:arrow-right-circle"></iron-icon>
              </paper-button>
            </a>
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
      user: {
        type: Object,
      },
      isMergeState: {
        type: Boolean,
        value: false,
      },
      email: String,
      providerCompanyName: String,
    };
  }

  stateChanged(state: import('../../redux/store').State) {
    this.setProperties({
      user: state.user,
    });
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
  }

  static get observers() {
    return ['_userChanged(user)'];
  }

  _userChanged(user) {
    dialogsActions.closeDialog(DIALOGS.SIGNIN);
    if (!user.signedIn) {
      if (user.initialProviderId && user.pendingCredential) {
        this.isMergeState = true;
        this.email = user.email;
        this.providerCompanyName = helperActions.getProviderCompanyName(user.initialProviderId);
        dialogsActions.openDialog(DIALOGS.SIGNIN);
      }
    }
  }

  _mergeAccounts() {
    userActions.mergeAccounts(this.user.initialProviderId, this.user.pendingCredential);
    dialogsActions.closeDialog(DIALOGS.SIGNIN);
    this.isMergeState = false;
  }

  _close() {
    this.isMergeState = false;
    dialogsActions.closeDialog(DIALOGS.SIGNIN);
  }

  _signIn(event) {
    const providerUrl = event.target.getAttribute('provider-url');
    userActions.signIn(providerUrl);
  }
}

window.customElements.define(SigninDialog.is, SigninDialog);
