import { Initialized } from '@abraham/remotedata';
import { property } from '@polymer/decorators';
import { PolymerElement } from '@polymer/polymer';
import { Constructor } from 'lit-element';
import { RootState, store } from '../store';
import { fetchSessions } from '../store/sessions/actions';
import { initialSessionsState, SessionsState } from '../store/sessions/state';

/* @polymerMixin */
export const SessionsHoC = <
  T extends Constructor<PolymerElement & { stateChanged(_state: RootState): void }>
>(
  subclass: T
) => {
  class SessionsClass extends subclass {
    @property({ type: Object })
    protected sessions: SessionsState = initialSessionsState;

    stateChanged(state: RootState) {
      super.stateChanged(state);
      this.sessions = state.sessions;
    }

    connectedCallback() {
      super.connectedCallback();

      if (this.sessions instanceof Initialized) {
        store.dispatch(fetchSessions());
      }
    }
  }

  return SessionsClass;
};
