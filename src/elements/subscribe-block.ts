import { Success } from '@abraham/remotedata';
import { computed, customElement, property } from '@polymer/decorators';
import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import { RootState, store } from '../store';
import { openDialog } from '../store/dialogs/actions';
import { DialogForm, DIALOGS } from '../store/dialogs/types';
import { subscribe } from '../store/subscribe/actions';
import { initialSubscribeState, SubscribeState } from '../store/subscribe/state';
import './hoverboard-icons';
import './shared-styles';

@customElement('subscribe-block')
export class SubscribeBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: flex;
          width: 100%;
          background: var(--default-primary-color);
          color: #fff;
          padding: 16px 0;
        }

        .description {
          font-size: 24px;
          line-height: 1.5;
          margin: 0 0 16px;
        }

        paper-button {
          color: #fff;
        }

        paper-button[disabled] {
          background: var(--default-primary-color);
          color: #fff;
        }

        @media (min-width: 640px) {
          :host {
            padding: 32px 0;
          }

          .description {
            font-size: 32px;
            margin: 0 0 24px;
            text-align: center;
          }
        }
      </style>

      <div class="container" layout vertical center$="[[viewport.isTabletPlus]]">
        <div class="description">{$ subscribeBlock.callToAction.description $}</div>
        <div class="cta-button">
          <paper-button
            class="animated icon-right"
            disabled$="[[subscribed.data]]"
            on-click="_subscribe"
            ga-on="click"
            ga-event-category="attendees"
            ga-event-action="subscribe"
            ga-event-label="subscribe block"
          >
            <span class="cta-label">[[ctaLabel]]</span>
            <iron-icon icon$="hoverboard:[[ctaIcon]]"></iron-icon>
          </paper-button>
        </div>
      </div>
    `;
  }

  @property({ type: Object })
  subscribed: SubscribeState = initialSubscribeState;

  @property({ type: Object })
  private user: { signedIn?: boolean; email?: string; displayName?: string } = {};
  @property({ type: Object })
  private viewport = {};

  stateChanged(state: RootState) {
    this.subscribed = state.subscribed;
    this.user = state.user;
    this.viewport = state.ui.viewport;
  }

  @computed('subscribed')
  get ctaIcon() {
    return this.subscribed instanceof Success ? 'checked' : 'arrow-right-circle';
  }

  @computed('subscribed')
  get ctaLabel() {
    return this.subscribed instanceof Success
      ? '{$  subscribeBlock.subscribed $}'
      : '{$  subscribeBlock.callToAction.label $}';
  }

  _subscribe() {
    let userData: {
      firstFieldValue?: string;
      secondFieldValue?: string;
    } = {};

    if (this.user.signedIn) {
      const fullNameSplit = this.user.displayName.split(' ');
      userData = {
        firstFieldValue: fullNameSplit[0],
        secondFieldValue: fullNameSplit[1],
      };
    }

    if (this.user.email) {
      this._subscribeAction(Object.assign({}, { email: this.user.email }, userData));
    } else {
      openDialog(DIALOGS.SUBSCRIBE, {
        title: '{$ subscribeBlock.formTitle $}',
        submitLabel: ' {$ subscribeBlock.subscribe $}',
        firstFieldLabel: '{$ subscribeBlock.firstName $}',
        secondFieldLabel: '{$ subscribeBlock.lastName $}',
        firstFieldValue: userData.firstFieldValue,
        secondFieldValue: userData.secondFieldValue,
        submit: (data: DialogForm) => this._subscribeAction(data),
      });
    }
  }

  _subscribeAction(data: DialogForm) {
    store.dispatch(subscribe(data));
  }
}
