import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { ReduxMixin } from '../../mixins/redux-mixin';
import { dialogsActions, helperActions, userActions } from '../../redux/actions';
import { DIALOGS } from '../../redux/constants';
import '../hmi-icons';
import '../shared-styles';
import './dialog-styles';

class SigninDialog extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          margin: 0 16px;
          display: block;
          background: var(--primary-background-color);
          box-shadow: var(--box-shadow);
          max-width: 315px;
        }

        .dialog-description {
          width: 100%;
          padding: 32px 32px 16px;
          background: var(--primary-gradient);
          color: #fff;
          font-size: 20px;
        }

        .dialog-content {
          margin: 0 auto;
          padding: 16px 16px;
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
          margin: 0 8px;
          --iron-icon-width: 48px;
          --iron-icon-height: 48px;
        }
      </style>

      <div class="dialog-description">{$ signInProviders.description $}</div>
      <div class="dialog-content">
        <div class="initial-signin" hidden$="[[isMergeState]]">
          <paper-button
            class="sign-in-button"
            on-click="_signIn"
            provider-url="{$ signInProviders.providersData.url $}"
            ga-on="click"
            ga-event-category="attendees"
            ga-event-action="sign-in"
            ga-event-label="signIn dialog - {$ signInProviders.providersData.name $}"
            flex
          >
            <iron-icon
              class="icon-{$ signInProviders.providersData.name $}"
              icon="hmi:{$ signInProviders.providersData.name $}"
            ></iron-icon>
            <span provider-url="{$ signInProviders.providersData.url $}"
              >{$ signInProviders.providersData.label $}</span
            >
          </paper-button>
        </div>
        <div class="merge-content" hidden$="[[!isMergeState]]">
          <h3 class="subtitle">{$ signInDialog.alreadyHaveAccount $}</h3>
          <div class="explanation">
            <div class="row-1">{$ signInDialog.alreadyUsed $} <b>[[email]]</b>.</div>
            <div class="row-2">
              {$ signInDialog.signInToContinue.part1 $} [[providerCompanyName]] {$
              signInDialog.signInToContinue.part2 $}
            </div>
          </div>

          <div class="action-button" layout horizontal end-justified>
            <paper-button
              class="merge-button"
              on-click="_mergeAccounts"
              ga-on="click"
              ga-event-category="attendees"
              ga-event-action="merge account"
              ga-event-label$="signIn merge account dialog -[[providerCompanyName]]"
              primary
            >
              <span>{$ signInDialog.signInToContinue.part1 $} [[providerCompanyName]]</span>
            </paper-button>
          </div>
        </div>
      </div>
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
