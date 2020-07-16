import '@polymer/marked-element';
import '@polymer/paper-progress';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import '../elements/content-loader';
import '../elements/posts-list';
import '../elements/shared-styles';
import '../elements/text-truncate';
import { ReduxMixin } from '../mixins/redux-mixin';
import { newsActions } from '../redux/actions';
import { store } from '../redux/store';
import { getDate } from '../utils/functions';

class NewsListPage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
        }

        .hero-description {
          padding: 10px;
          border-left: 5px solid var(--default-primary-color);
        }

        .featured-posts-wrapper {
          grid-template-columns: 1fr;
          display: grid;
          grid-gap: 24px;
        }

        .featured {
          background-color: var(--primary-background-color);
        }

        .featured-post {
          padding: 24px 0;
          display: block;
          color: var(--primary-text-color);
        }

        .featured-post:not(:last-of-type) {
          border-bottom: 3px solid var(--default-primary-color);
          border-bottom-style: dashed;
        }

        .image {
          margin-right: 24px;
          width: 64px;
          height: 64px;
          border-radius: var(--border-radius);
        }

        .image-overlay {
          background-color: rgba(5, 5, 5, 0.6);
        }

        .details {
          height: 100%;
        }

        .title {
          line-height: 1.2;
          color: var(--default-primary-color);
        }

        .description {
          margin-top: 8px;
          color: var(--secondary-text-color);
        }

        .date {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--secondary-text-color);
        }

        h2 {
          margin: 0;
        }

        paper-progress {
          width: 100%;
          --paper-progress-active-color: var(--default-primary-color);
          --paper-progress-secondary-color: var(--default-secondary-color);
        }

        @media (min-width: 640px) {
          .image {
            width: 128px;
            height: 128px;
          }
        }
      </style>

      <polymer-helmet
        title="{$ heroSettings.news.title $} | {$ title $}"
        description="{$ heroSettings.news.metaDescription $}"
        active="[[active]]"
      ></polymer-helmet>

      <hero-block
        background-image="{$ heroSettings.news.background.image $}"
        background-color="{$ heroSettings.news.background.color $}"
        font-color="{$ heroSettings.news.fontColor $}"
        active="[[active]]"
        hide-logo
      >
        <div class="hero-title highlight-font">{$ heroSettings.news.title $}</div>
        <p class="hero-description">{$ heroSettings.news.description $}</p>
      </hero-block>

      <paper-progress indeterminate hidden$="[[contentLoaderVisibility]]"></paper-progress>

      <div class="container">
        <content-loader
          class="featured-posts-wrapper"
          card-padding="24px"
          card-height="160px"
          border-radius="var(--border-radius)"
          title-top-position="32px"
          title-height="42px"
          title-width="70%"
          load-from="-70%"
          load-to="130%"
          animation-time="1s"
          items-count="{$ contentLoaders.news.itemsCount $}"
          hidden$="[[contentLoaderVisibility]]"
        >
        </content-loader>

        <template is="dom-repeat" items="[[featuredPosts]]" as="post">
          <a
            href$="/news/posts/[[post.id]]/"
            class="featured-post"
            ga-on="click"
            ga-event-category="blog"
            ga-event-action="open post"
            ga-event-label$="[[post.title]]"
            layout
            horizontal
          >
            <plastic-image
              class="image"
              srcset="[[post.image]]"
              style$="background-color: [[post.backgroundColor]];"
              sizing="cover"
              lazy-load
              preload
              fade
            ></plastic-image>
            <div flex>
              <div class="details" layout vertical justified>
                <div>
                  <text-truncate lines="2">
                    <h2 class="title">[[post.title]]</h2>
                  </text-truncate>
                  <text-truncate lines="3">
                    <marked-element class="description" markdown="[[post.brief]]">
                      <div slot="markdown-html"></div>
                    </marked-element>
                  </text-truncate>
                </div>
                <span class="date">[[getDate(post.published)]]</span>
              </div>
            </div>
          </a>
        </template>
      </div>
    `;
  }

  static get is() {
    return 'news-list-page';
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
      postsList: state.blog.list,
      postsFetching: state.blog.fetching,
      postsFetchingError: state.blog.fetchingError,
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.postsFetching && (!this.postsList || !this.postsList.length)) {
      store.dispatch(newsActions.fetchList());
    }
  }

  static get observers() {
    return ['_postsChanged(postsList)'];
  }

  _postsChanged() {
    if (this.postsList && this.postsList.length) {
      this.contentLoaderVisibility = true;
      this.set('featuredPosts', this.postsList.slice(0, 3));
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

window.customElements.define(NewsListPage.is, NewsListPage);
