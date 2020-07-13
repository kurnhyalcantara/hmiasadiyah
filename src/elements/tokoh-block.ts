import '@polymer/iron-icon';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import { ReduxMixin } from '../mixins/redux-mixin';
import { SpeakersHoC } from '../mixins/speakers-hoc';
import { randomOrder } from '../utils/functions';
import './shared-styles';
import './text-truncate';

class TokohBlock extends SpeakersHoC(ReduxMixin(PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          border-bottom: 1px solid var(--divider-color);
        }

        .tokoh-wrapper {
          margin: 12px 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 32px 16px;
        }

        .tokoh {
          text-align: center;
        }

        .photo {
          width: 72px;
          height: 72px;
          background-color: var(--accent-color);
          border-radius: 50%;
          overflow: hidden;
          transform: translateZ(0);
        }

        .badges {
          position: absolute;
          top: 0;
          left: calc(50% + 24px);
        }

        .badge {
          margin-left: -10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #fff;
          transition: transform var(--animation);
        }

        .badge:hover {
          transform: scale(1.1);
        }

        .badge:nth-of-type(2) {
          transform: translate(0, 100%);
        }

        .badge:nth-of-type(2):hover {
          transform: translate3d(0, 100%, 20px) scale(1.1);
        }

        .badge-icon {
          --iron-icon-width: 12px;
          --iron-icon-height: 12px;
          color: #fff;
        }

        .company-logo {
          margin-top: 6px;
          width: 100%;
          height: 16px;
        }

        .description {
          color: var(--primary-text-color);
        }

        .name {
          margin-top: 8px;
          line-height: 1.1;
        }

        .origin {
          margin-top: 4px;
          font-size: 14px;
          line-height: 1.1;
        }

        .cta-button {
          margin-top: 24px;
        }

        @media (min-width: 640px) {
          .photo {
            width: 128px;
            height: 128px;
          }

          .name {
            font-size: 24px;
          }
        }

        @media (min-width: 812px) {
          .tokoh-wrapper {
            grid-template-columns: repeat(3, 1fr);
          }

          .tokoh:last-of-type {
            display: none;
          }

          .badges {
            left: calc(50% + 32px);
          }

          .badge:nth-of-type(2) {
            transform: translate(25%, 75%);
          }

          .badge:nth-of-type(2):hover {
            transform: translate3d(25%, 75%, 20px) scale(1.1);
          }

          .badge:nth-of-type(3) {
            transform: translate(10%, 180%);
          }

          .badge:nth-of-type(3):hover {
            transform: translate3d(10%, 180%, 20px) scale(1.1);
          }
        }

        @media (min-width: 1024px) {
          .tokoh-wrapper {
            grid-template-columns: repeat(4, 1fr);
          }

          .tokoh:last-of-type {
            display: block;
          }
        }
      </style>

      <div class="container">
        <div class="container-title">{$ tokohBlock.title $}</div>
        <div class="tokoh-wrapper">
          <template is="dom-repeat" items="[[featuredSpeakers]]" as="tokoh">
            <div
              class="tokoh"
              ga-on="click"
              ga-event-category="tokoh"
              ga-event-action="open details"
              ga-event-label$="[[tokoh.name]]"
            >
              <div relative>
                <plastic-image
                  class="photo"
                  srcset="[[tokoh.photoUrl]]"
                  sizing="cover"
                  lazy-load
                  preload
                  fade
                ></plastic-image>
              <div class="description">
                <text-truncate lines="2">
                  <h3 class="name">[[tokoh.name]]</h3>
                </text-truncate>
                <text-truncate lines="1">
                  <div class="origin">[[tokoh.job]]</div>
                </text-truncate>
              </div>
            </div>
          </template>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'tokoh-block';
  }

  static get observers() {
    return ['_generateSpeakers(speakers)'];
  }

  static get properties() {
    return {
      featuredSpeakers: Array,
    };
  }

  stateChanged(state: import('../redux/store').State) {
    super.stateChanged(state);
    return this.setProperties({
      speakers: state.speakers.list,
    });
  }

  _generateSpeakers(speakers) {
    const filteredSpeakers = this.speakers.filter((speaker) => speaker.featured);
    const randomSpeakers = randomOrder(filteredSpeakers.length ? filteredSpeakers : speakers);
    this.set('featuredSpeakers', randomSpeakers.slice(0, 4));
  }
}

window.customElements.define(TokohBlock.is, TokohBlock);
