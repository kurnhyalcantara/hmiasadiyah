import '@polymer/marked-element';
import '@polymer/paper-progress';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import '../elements/content-loader';
import '../elements/posts-list';
import '../elements/shared-styles';
import '../elements/text-truncate';
import { ReduxMixin } from '../mixins/redux-mixin';
import { opiniActions } from '../redux/actions';
import { store } from '../redux/store';
import { getDate } from '../utils/functions';

class OpiniListPage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
        }

        .featured-opini-wrapper {
          grid-template-columns: 1fr;
          display: grid;
          grid-gap: 10px;
        }

        .featured-opini {
          height: 200px;
          border-radius: 9px;
          overflow: hidden;
        }

        .featured-opini:not(:last-of-type) {
          border-bottom: 1px var(--divider-color);
          border-bottom-style: dashed;
        }

        .image {
          width: 100%;
          height: 100%;
        }

        .image-overlay {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .details {
          padding: 24px;
          height: 100%;
          transform: translateZ(0);
          box-sizing: border-box;
        }

        .title {
          line-height: 1.2;
          color: #fff;
        }

        .hero-description {
          padding: 10px;
          border-left: 5px solid var(--default-primary-color);
        }

        h3 {
          margin: 0;
        }

        .description {
          margin-top: 8px;
          color: var(--divider-color);
        }

        .date {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--divider-color);
        }

        paper-progress {
          width: 100%;
          --paper-progress-active-color: var(--default-primary-color);
          --paper-progress-secondary-color: var(--default-primary-color);
        }

        @media (min-width: 640px) {
          .featured-opini {
            height: 256px;
          }

          .featured-opini-wrapper {
            grid-template-columns: repeat(3, 1fr);
            display: grid;
            grid-gap: 10px;
          }
        }
      </style>

      <polymer-helmet
        title="{$ heroSettings.opini.title $} | {$ title $}"
        description="{$ heroSettings.opini.metaDescription $}"
        active="[[active]]"
      ></polymer-helmet>

      <hero-block
        background-image="{$ heroSettings.opini.background.image $}"
        background-color="{$ heroSettings.opini.background.color $}"
        font-color="{$ heroSettings.opini.fontColor $}"
        active="[[active]]"
        hide-logo
      >
        <div class="hero-title highlight-font">{$ heroSettings.opini.title $}</div>
        <p class="hero-description">{$ heroSettings.opini.description $}</p>
      </hero-block>

      <paper-progress indeterminate hidden$="[[contentLoaderVisibility]]"></paper-progress>

      <div class="container">
        <content-loader
          class="featured-opini-wrapper"
          card-padding="24px"
          card-height="256px"
          border-radius="var(--border-radius)"
          title-top-position="32px"
          title-height="42px"
          title-width="72%"
          load-from="-70%"
          load-to="130%"
          animation-time="1s"
          items-count="{$ contentLoaders.blog.itemsCount $}"
          hidden$="[[contentLoaderVisibility]]"
        >
        </content-loader>

        <div class="featured-opini-wrapper">
          <template is="dom-repeat" items="[[featuredOpini]]" as="post">
            <a href$="/opini/articles/[[post.id]]/" class="featured-opini" relative>
              <plastic-image
                class="image"
                srcset="[[post.image]]"
                style$="background-color: [[post.backgroundColor]];"
                sizing="cover"
                hidden$="[[!post.image]]"
                lazy-load
                preload
                fade
                fit
              ></plastic-image>
              <div class="image-overlay" fit></div>
              <div class="details" layout vertical justified>
                <div>
                  <text-truncate lines="2">
                    <h3 class="title">[[post.title]]</h3>
                  </text-truncate>
                  <text-truncate lines="[[_addIfNotPhone(2, 1)]]">
                    <marked-element class="description" markdown="[[post.brief]]">
                      <div slot="markdown-html"></div>
                    </marked-element>
                  </text-truncate>
                </div>
                <span class="date">[[getDate(post.published)]]</span>
              </div>
            </a>
          </template>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'opini-list-page';
  }

  static get properties() {
    return {
      active: Boolean,
      postsList: {
        type: Array,
      },
      postsFetching: {
        type: Boolean,
      },
      postsFetchingError: {
        type: Object,
      },
      viewport: {
        type: Object,
      },
      posts: Array,
      featuredPosts: Array,
      contentLoaderVisibility: {
        type: String,
        value: null,
      },
    };
  }

  active = false;

  private postsList = [];
  private postsFetching = false;
  private postsFetchingError = {};
  private viewport: { isTabletPlus?: boolean } = {};
  private posts = [];
  private featuredPosts = [];
  private contentLoaderVisibility = false;

  stateChanged(state: import('../redux/store').State) {
    this.setProperties({
      viewport: state.ui.viewport,
      postsList: state.opini.list,
      postsFetching: state.opini.fetching,
      postsFetchingError: state.opini.fetchingError,
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.postsFetching && (!this.postsList || !this.postsList.length)) {
      store.dispatch(opiniActions.fetchList());
    }
  }

  static get observers() {
    return ['_postsChanged(postsList)'];
  }

  _postsChanged() {
    if (this.postsList && this.postsList.length) {
      this.contentLoaderVisibility = true;
      this.set('featuredOpini', this.postsList.slice(0, 3));
      this.set('posts', this.postsList.slice(3));
    }
  }

  _addIfNotPhone(base, additional) {
    if (this.viewport.isTabletPlus) {
      return base + additional;
    }
    return base;
  }

  getDate(date) {
    return getDate(date);
  }
}

window.customElements.define(OpiniListPage.is, OpiniListPage);
