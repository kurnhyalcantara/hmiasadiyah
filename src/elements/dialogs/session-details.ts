import { Success } from '@abraham/remotedata';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icon';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import '@polymer/marked-element';
import '@polymer/paper-fab';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import 'plastic-image';
import '../../components/auth-required';
import { ReduxMixin } from '../../mixins/redux-mixin';
import { RootState, store } from '../../store';
import { closeDialog, openDialog } from '../../store/dialogs/actions';
import { DIALOGS } from '../../store/dialogs/types';
import { setUserFeaturedSessions } from '../../store/featured-sessions/actions';
import {
  FeaturedSessionsState,
  initialFeaturedSessionsState,
} from '../../store/featured-sessions/state';
import { showToast } from '../../store/toast/actions';
import { toggleVideoDialog } from '../../store/ui/actions';
import { getVariableColor } from '../../utils/functions';
import '../feedback-block';
import '../shared-styles';
import '../text-truncate';
import './dialog-styles';

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const ONE_MINUTE_MS = 60 * 1000;

class SessionDetails extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles dialog-styles flex flex-alignment positioning">
        .section {
          cursor: pointer;
        }

        .star-rating {
          display: inline-block;
          vertical-align: middle;
        }
      </style>

      <polymer-helmet
        title="[[session.title]] | {$ title $}"
        description="[[session.description]]"
        image="[[session.speakers.0.photoUrl]]"
        active="[[opened]]"
        label1="{$ time $}"
        data1="[[session.dateReadable]], [[session.startTime]] - [[session.endTime]]"
        label2="{$ sessionDetails.contentLevel $}"
        data2="[[session.complexity]]"
      ></polymer-helmet>

      <app-header-layout has-scrolling-region>
        <app-header slot="header" class="header" fixed="[[viewport.isTabletPlus]]">
          <iron-icon
            class="close-icon"
            icon="hoverboard:[[_getCloseBtnIcon(viewport.isLaptopPlus)]]"
            on-click="_close"
          ></iron-icon>
          <app-toolbar>
            <div class="dialog-container header-content" layout vertical end-justified>
              <h2 class="name">[[session.title]]</h2>
              <div class="tags" hidden$="[[!session.tags.length]]">
                <template is="dom-repeat" items="[[session.tags]]" as="tag">
                  <span class="tag" style$="color: [[getVariableColor(tag)]]">[[tag]]</span>
                </template>
              </div>

              <div class="float-button">
                <paper-fab
                  icon="hoverboard:[[_getFeaturedSessionIcon(featuredSessions, session.id)]]"
                  hidden$="[[!viewport.isLaptopPlus]]"
                  on-click="_toggleFeaturedSession"
                ></paper-fab>
              </div>
            </div>
          </app-toolbar>
        </app-header>

        <div class="dialog-container content">
          <div class="float-button">
            <paper-fab
              icon="hoverboard:[[_getFeaturedSessionIcon(featuredSessions, session.id)]]"
              hidden$="[[viewport.isLaptopPlus]]"
              on-click="_toggleFeaturedSession"
            ></paper-fab>
          </div>
          <h3 class="meta-info" hidden$="[[disabledSchedule]]">
            [[session.dateReadable]], [[session.startTime]] - [[session.endTime]]
          </h3>
          <h3 class="meta-info" hidden$="[[disabledSchedule]]">[[session.track.title]]</h3>
          <h3 class="meta-info" hidden$="[[!session.complexity]]">
            {$ sessionDetails.contentLevel $}: [[session.complexity]]
          </h3>

          <marked-element class="description" markdown="[[session.description]]">
            <div slot="markdown-html"></div>
          </marked-element>

          <div class="actions" layout horizontal>
            <a
              class="action"
              href$="[[session.presentation]]"
              hidden$="[[!session.presentation]]"
              target="_blank"
              rel="noopener noreferrer"
              layout
              horizontal
              center
            >
              <iron-icon icon="hoverboard:presentation"></iron-icon>
              <span>{$ sessionDetails.viewPresentation $}</span>
            </a>
            <div
              class="action"
              hidden$="[[!session.videoId]]"
              on-click="_openVideo"
              layout
              horizontal
              center
            >
              <iron-icon icon="hoverboard:video"></iron-icon>
              {$ sessionDetails.viewVideo $}
            </div>
          </div>

          <div class="additional-sections" hidden$="[[!session.speakers.length]]">
            <h3>{$ sessionDetails.speakers $}</h3>

            <template is="dom-repeat" items="[[session.speakers]]" as="speaker">
              <div class="section" on-click="_openSpeaker" speaker-id$="[[speaker.id]]">
                <div layout horizontal center>
                  <plastic-image
                    class="section-photo"
                    srcset="[[speaker.photoUrl]]"
                    sizing="cover"
                    lazy-load
                    preload
                    fade
                  ></plastic-image>

                  <div class="section-details" flex>
                    <div class="section-primary-text">[[speaker.name]]</div>
                    <div class="section-secondary-text">
                      [[speaker.company]] / [[speaker.country]]
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div id="feedback" class="additional-sections">
            <h3>{$ feedback.headline $}</h3>

            <auth-required hidden="[[!acceptingFeedback]]">
              <slot slot="prompt">{$ feedback.leaveFeedback $}</slot>
              <feedback-block session-id="[[session.id]]"></feedback-block>
            </auth-required>

            <p hidden="[[acceptingFeedback]]">{$ feedback.sessionClosed $}</p>
          </div>
        </div>
      </app-header-layout>
    `;
  }

  static get is() {
    return 'session-details';
  }

  static get properties() {
    return {
      ...super.properties,
      disabledSchedule: {
        type: Boolean,
        value: () => JSON.parse('{$ disabledSchedule $}'),
      },
      data: {
        type: Object,
        observer: '_dataUpdate',
      },
      session: {
        type: Object,
        observer: '_sessionUpdate',
      },
      acceptingFeedback: {
        value: false,
        type: Boolean,
      },
      viewport: {
        type: Object,
      },
      user: {
        type: Object,
      },
      featuredSessions: {
        type: Object,
        value: initialFeaturedSessionsState,
      },
      currentSpeaker: {
        type: String,
      },
      opened: {
        type: Boolean,
        value: false,
      },
    };
  }

  stateChanged(state: RootState) {
    super.stateChanged(state);
    this.setProperties({
      featuredSessions: state.featuredSessions,
      currentSpeaker: state.routing.subRoute,
      user: state.user,
      viewport: state.ui.viewport,
    });
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
  }

  _close() {
    closeDialog();
    history.back();
  }

  _openSpeaker(event: Event & { currentTarget: HTMLElement }) {
    const speakerId = event.currentTarget.getAttribute('speaker-id');
    const speakerData = this.speakers.find((speaker) => speaker.id === speakerId);

    if (!speakerData) return;
    openDialog(DIALOGS.SPEAKER, speakerData);
  }

  _getCloseBtnIcon(isLaptopViewport: boolean) {
    return isLaptopViewport ? 'close' : 'arrow-left';
  }

  _openVideo() {
    toggleVideoDialog({
      title: this.session.title,
      youtubeId: this.session.videoId,
      disableControls: true,
      opened: true,
    });
  }

  _toggleFeaturedSession(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.user.signedIn) {
      showToast({
        message: '{$ schedule.saveSessionsSignedOut $}',
        action: {
          title: 'Sign in',
          callback: () => openDialog(DIALOGS.SIGNIN),
        },
      });
      return;
    }
    const sessions = Object.assign({}, this.featuredSessions.data, {
      [this.session.id]: !this.featuredSessions.data[this.session.id] ? true : null,
    });

    store.dispatch(setUserFeaturedSessions(this.user.uid, sessions));
  }

  _getFeaturedSessionIcon(featuredSessions: FeaturedSessionsState, sessionId?: string) {
    return featuredSessions instanceof Success && featuredSessions.data[sessionId]
      ? 'bookmark-check'
      : 'bookmark-plus';
  }

  _dataUpdate() {
    if (this.data?.name === DIALOGS.SESSION) {
      this.session = this.data.data;
    }
  }

  _sessionUpdate() {
    const { day, startTime } = this.session;
    if (day && startTime) {
      const now = new Date();
      const currentTime = new Date(`${day} ${startTime}`).getTime();
      const timezoneOffset = parseInt('{$ timezoneOffset $}') - now.getTimezoneOffset();
      const convertedTimezoneDate = new Date(currentTime + timezoneOffset * ONE_MINUTE_MS);
      const diff = now.getTime() - convertedTimezoneDate.getTime();
      this.acceptingFeedback = diff > 0 && diff < ONE_WEEK_MS;
    } else {
      this.acceptingFeedback = false;
    }
  }

  getVariableColor(value: string) {
    return getVariableColor(this, value);
  }
}

window.customElements.define(SessionDetails.is, SessionDetails);
