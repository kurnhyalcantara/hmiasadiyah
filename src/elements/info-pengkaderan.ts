import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import 'plastic-image';
import { dialogsActions, toastActions } from '../redux/actions';
import { DIALOGS } from '../redux/constants';
class InfoPengkaderan extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
        }

        .poster {
          width: 100%;
          padding: 12px 12px;
          height: 400px;
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
        }

        .session-header {
          padding-bottom: 8px;
        }

        .session-header,
        .session-content,
        .session-footer {
          padding: 16px;
          z-index: 1;
        }

        .session-title {
          font-size: 20px;
          line-height: 1.2;
        }

        .session-header {
          font-size: 12px;
        }

        .session-details,
        .session-description {
          display: inline-block;
          color: var(--disabled-text-color);
          margin-top: 8px;
        }

        .icon-details {
          display: inline-block;
          --iron-icon-width: 12px;
          --iron-icon-fill-color: var(--primary-text-color);
          margin-right: 2px;
        }

        .status {
          display: inline;
          padding: .2em .6em .3em;
          font-size: 75%;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-align: center;
          text-transform: uppercase;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: .25em;
          background-color: var(--terbuka);
        }

        .add-session {
          padding: 8px;
          grid-column-end: -1 !important;
          background-color: var(--primary-background-color);
          border-bottom-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
          font-size: 14px;
          color: var(--secondary-text-color);
          text-transform: uppercase;
          border: 1px solid var(--border-light-color);
        }

        .add-session:hover {
          background-color: var(--additional-background-color);
        }

        .add-session-icon {
          --iron-icon-width: 14px;
          margin-right: 8px;
        }

        .tags {
          font-weight: 600;
          color: var(--perkaderan);
        }

      </style>
      <div class="container">
        <div class="container-title">{$ pengkaderanBlock.title $}</div>
        <p hidden="[[isPengkaderanExist]]">{$ pengkaderanBlock.nothing $}</p>
        <div class="pengkaderan card" layout vertical>
        <plastic-image
          class="poster"
          srcset="{$ pengkaderanBlock.info.image $}"
          alt="{$ pengkaderanBlock.info.title $}"
          sizing="cover"
          lazy-load
          preload
          fade
        ></plastic-image>
          <div class="session-header" layout center>
            <div flex>
              <h3 class="session-title">{$ pengkaderanBlock.info.title $}</h3>
              <div class="session-details">
                <div class="pendaftaran">
                  <iron-icon class="icon-details" icon="icons:assignment"></iron-icon>
                  {$ session.pendaftaran $}
                  <span class="status">{$ pengkaderanBlock.info.status $}</span>
                </div>
                <div class="kategori">
                  <iron-icon class="icon-details" icon="icons:label"></iron-icon>
                  {$ session.kategori $}
                  <span class="tags">{$ pengkaderanBlock.info.tag $}</span> 
                </div>
                <div class="tempat">
                  <iron-icon class="icon-details" icon="icons:store"></iron-icon>
                  <span class="session-city">{$ pengkaderanBlock.info.city $}</span>
                  <span class="session-track"> - {$ pengkaderanBlock.info.address $}</span>
                </div>
                <div class="session-date">
                <iron-icon class="icon-details" icon="icons:today"></iron-icon>
                  {$ pengkaderanBlock.info.tanggal $}
                </div>
              </div>
            </div>
          </div>

          <a
            class="add-session"
            on-click="_onRegisterListener"
            layout
            horizontal
            center-center
          >
            <iron-icon class="add-session-icon" icon="hmi:add-circle-outline"></iron-icon>
            <span>{$ schedule.registerSchedule $}</span>
          </a>    
        </div>  
      </div>
      `;
  }

  static get is() {
    return 'info-pengkaderan';
  }

  private user: { signedIn?: boolean } = {};
  private isPengkaderanExist = true;
  private dialogs: { signin: { isOpened: false } };
  static get properties() {
    return {
      user: Object,
      isPengkaderanExist: {
        type: Boolean
      },
      dialogs: Object
    };
  }

  stateChanged(state: import('../redux/store').State) {
    this.setProperties({
      user: state.user
    });
  }

  _onRegisterListener(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.user.signedIn) {
      toastActions.showToast({
        message: '{$ schedule.saveSessionsSignedOut $}',
        action: {
          title: 'Sign in',
          callback: () => {
            dialogsActions.openDialog(DIALOGS.SIGNIN);
          },
        },
      });
      return;
    }
  }

}

window.customElements.define(InfoPengkaderan.is, InfoPengkaderan);