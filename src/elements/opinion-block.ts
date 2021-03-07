import '@polymer/iron-icon';
import '@polymer/marked-element';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import { ReduxMixin } from '../mixins/redux-mixin';
import { opiniActions } from '../redux/actions';
import { store } from '../redux/store';
import { getDate } from '../utils/functions';
import './shared-styles';
import './text-truncate';

class OpinionBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
        }

        .opini-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
        }

        .image {
          width: 100%;
          height: 128px;
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
        }

        .details {
          padding: 16px;
        }

        .title {
          font-size: 20px;
          line-height: 1.2;
        }

        .description {
          margin-top: 8px;
          color: var(--secondary-text-color);
        }

        .date {
          margin-top: 16px;
          font-size: 12px;
          text-transform: uppercase;
          color: var(--secondary-text-color);
        }

        paper-button[stroke] {
          color: var(--default-primary-color);
          border: 1px solid var(--default-primary-color);
        }

        .cta-button {
          margin-top: 24px;
        }

        @media (min-width: 640px) {
          .opini-wrapper {
            grid-template-columns: repeat(3, 1fr);
          }

          .opini:last-of-type {
            display: none;
          }
        }

        @media (min-width: 812px) {
          .opini-wrapper {
            grid-template-columns: repeat(4, 1fr);
          }

          .opini:last-of-type {
            display: flex;
          }
        }
      </style>

      <div class="container">
        <div class="container-title">{$ opiniBlock.title $}</div>
        <div class="opini-wrapper">
          <template is="dom-repeat" items="[[opini]]" as="opini">
            <a
              href$="/opini/articles/[[opini.id]]/"
              class="opini card"
              ga-on="click"
              ga-event-category="blog"
              ga-event-action="open opini"
              ga-event-label$="[[opini.title]]"
              flex
              layout
              vertical
            >
              <plastic-image
                class="image"
                srcset="[[opini.image]]"
                style$="background-color: [[opini.backgroundColor]];"
                sizing="cover"
                lazy-load
                preload
                fade
              ></plastic-image>
              <div class="details" layout vertical justified flex-auto>
                <div>
                  <text-truncate lines="2">
                    <h3 class="title">[[opini.title]]</h3>
                  </text-truncate>
                  <text-truncate lines="3">
                    <marked-element class="description" markdown="[[opini.brief]]">
                      <div slot="markdown-html"></div>
                    </marked-element>
                  </text-truncate>
                </div>
                <div class="date">[[getDate(opini.published)]]</div>
              </div>
            </a>
          </template>
        </div>

        <a href="{$ opiniBlock.callToAction.link $}">
          <paper-button class="cta-button animated icon-right" stroke>
            <span>{$ opiniBlock.callToAction.label $}</span>
            <iron-icon icon="hmi:arrow-right-circle"></iron-icon>
          </paper-button>
        </a>
      </div>
    `;
  }

  static get is() {
    return 'opinion-block';
  }

  private viewport = {};
  private opini = [];
  private opiniList = [];
  private opiniFetching = false;
  private opiniFetchingError = {};

  static get properties() {
    return {
      viewport: Object,
      opini: Array,
      opiniList: {
        type: Array,
        observer: '_transformPosts',
      },
      opiniFetching: Boolean,
      opiniFetchingError: Object,
    };
  }

  stateChanged(state: import('../redux/store').State) {
    return this.setProperties({
      viewport: state.ui.viewport,
      opiniList: state.opini.list,
      opiniFetching: state.opini.fetching,
      opiniFetchingError: state.opini.fetchingError,
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.opiniFetching && (!this.opiniList || !this.opiniList.length)) {
      store.dispatch(opiniActions.fetchList());
    }
  }

  _transformPosts(opiniList) {
    this.set('opini', opiniList.slice(0, 2));
  }

  getDate(date) {
    return getDate(date);
  }
}

window.customElements.define(OpinionBlock.is, OpinionBlock);
