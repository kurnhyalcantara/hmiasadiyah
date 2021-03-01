import '@material/mwc-button';
import { customElement, html, internalProperty } from 'lit-element';
import { ReduxMixin } from '../mixins/redux-mixin';
import { openDialog } from '../store/dialogs/actions';
import { DIALOGS } from '../store/dialogs/types';
import { RootState } from '../store';
import { ThemedElement } from './themed-element';

@customElement('auth-required')
export class AuthRequired extends ReduxMixin(ThemedElement) {
  @internalProperty()
  private signedIn = false;

  render() {
    return html`
      <div class="container">
        <mwc-button
          label="{$ signIn $}"
          @click="${() => this.signIn()}"
          ?hidden="${this.signedIn}"
          dense
        ></mwc-button>
        <slot name="prompt" ?hidden="${this.signedIn}"></slot>
        <slot ?hidden="${!this.signedIn}"></slot>
      </div>
    `;
  }

  stateChanged(state: RootState) {
    this.signedIn = state.user.signedIn;
  }

  private signIn() {
    openDialog(DIALOGS.SIGNIN);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auth-required': AuthRequired;
  }
}
