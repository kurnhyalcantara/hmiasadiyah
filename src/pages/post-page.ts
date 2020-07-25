import '@polymer/app-route/app-route';
import '@polymer/iron-ajax/iron-ajax';
import '@polymer/marked-element';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import '@polymer/paper-icon-button';
import '../elements/posts-list';
import '../elements/shared-styles';
import '../elements/gabung-block';
import '../elements/footer-block';
import { ReduxMixin } from '../mixins/redux-mixin';
import { newsActions } from '../redux/actions';
import { store } from '../redux/store';
import { getDate } from '../utils/functions';
import { share } from '../utils/share';

class PostPage extends ReduxMixin(PolymerElement) {
  active = false;
  route: object;

  private post = {};
  private postsList = [];
  private postsMap = {};
  private postsFetching = false;
  private postsFetchingError = {};
  private viewport = {};
  private postData: { id?: string } = {};

  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
        }

        .path-page {
          display: block;
          margin: 0;
          color: var(--light-primary-color);
        }

        .hero-title {
          font-size: 22px;
        }

        .author-share {
          width: 100%;
          overflow: hidden;
          padding: 0 0 15px;
          z-index: 1;
          position: relative;
          background: transparent;
        }

        .author-item {
          font-size: 14px;
          float: none;
          overflow: hidden;
          width: 100%;
        }

        .author-item .fn {
          margin: 4px 0 0 0;
          display: block;
        }

        .fa.fa-certificate {
          display: inline-block;
          transform: tranlsate(0, 0);
          margin: 1px 0 0 3px;
          font-size: 14px;
          position: absolute;
          color: var(--default-primary-color);
        }

        .fa-certificate::before {
          content: '0a3';
        }

        .author-img,
        .author-item-img {
          width: 39px;
          height: 39px;
        }

        .author-img {
          margin: 0 10px 0 0;
          display: block;
          float: left;
        }

        .author-item-img {
          content: '';
          background: radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%)
              repeat scroll 0 0%,
            radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%) repeat
              scroll 0 0%,
            radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%) repeat
              scroll 0 0%,
            radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%) repeat
              scroll 0 0%,
            radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%) repeat
              scroll 0 0%,
            radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%) repeat
              scroll 0 0%,
            radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent) repeat
              scroll 0 0%,
            rgba(0, 0, 0, 0)
              linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%) repeat
              scroll 0 0;
          border-radius: 20px;
        }

        .social-group.share-block {
          margin-bottom: 17px;
          margin-right: 0;
          padding-top: 0;
        }

        .title {
          display: inline-block;
          text-transform: uppercase;
          margin: 0;
        }

        .nav-inline {
          display: inline;
          margin: 0 55px 0 5px;
        }

        ul.nav-inline {
          padding-left: 10px;
        }

        .share {
        }

        .nav-inline li {
          display: inline-block;
        }

        .share {
          height: 30px;
          padding: 8px;
          width: 35px;
          display: inline-block;
          margin: 0;
          color: var(--primary-background-color);
        }

        .share-facebook {
          background-color: var(--facebook-color);
        }

        .share-twitter {
          background-color: var(--twitter-color);
        }

        .share-whatsapp {
          background-color: var(--whatsapp-color);
        }

        .post {
          margin-bottom: 25px;
        }

        .date {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--secondary-text-color);
        }

        .suggested-posts {
          background-color: var(--primary-background-color);
        }

        [slot='markdown-html'] {
          font-size: 14px;
          line-height: 1.8;
          color: var(--primary-text-color);
        }

        [slot='markdown-html'] h1,
        [slot='markdown-html'] h2,
        [slot='markdown-html'] h3 {
          margin: 48px 0 16px;
        }

        [slot='markdown-html'] p {
          margin-top: 0;
          margin-bottom: 24px;
        }

        [slot='markdown-html'] plastic-image {
          margin: 32px 0 8px -16px;
          --iron-image-width: calc(100% + 32px);
          width: calc(100% + 32px);
          min-height: 200px;
          background-color: var(--secondary-background-color);
        }

        @media (min-width: 640px) {
          [slot='markdown-html'] plastic-image {
            min-height: 400px;
          }

          .author-item {
            float: left;
            width: 100%;
          }

          .author-item .fn {
            margin: 5px 0 0 0;
          }

          .fa.fa-certificate {
            margin: 0 0 0 3px;
            font-size: 18px;
          }

          .hero-title {
            font-size: 40px;
          }
        }
      </style>

      <polymer-helmet
        title="[[post.title]] | {$ title $}"
        description="[[post.brief]]"
        image="[[post.image]]"
        active="[[active]]"
        label1="{$ news.published $}"
        data1="[[published]]"
      ></polymer-helmet>

      <app-route route="[[route]]" pattern="/:id" data="{{postData}}"></app-route>

      <hero-block
        background-image="[[post.image]]"
        background-color="[[post.primaryColor]]"
        font-color="#fff"
        active="[[active]]"
      >
        <div class="path-page">{$ heroSettings.news.path $}</div>
        <div class="hero-title highlight-font">[[post.title]]</div>
        <div class="author-share">
          <div class="author-item">
            <div class="author-img" layout vertical center>
              <div class="author-item-img">
                <plastic-image
                  srcset="[[post.author.image]]"
                  alt="[[post.author.name]]"
                ></plastic-image>
              </div>
            </div>
            <span class="fn">[[post.author.name]]<i class="fa fa-certificate"></i></span>
            <span class="date-header-item">[[getDate(post.published)]]</span>
          </div>
          <div class="social-group share-block">
            <div class="title">{$ share $}</div>
            <div class="nav-inline">
              <div class="share">
                <paper-icon-button
                  class="share-facebook"
                  icon="hmi:facebook"
                  share="facebook"
                  on-click="share"
                  ga-on="click"
                  ga-event-category="social"
                  ga-event-action="share"
                  ga-event-label="facebook"
                >
                </paper-icon-button>
              </div>
              <div class="share">
                <paper-icon-button
                  class="share-twitter"
                  icon="hmi:twitter"
                  share="twitter"
                  on-click="share"
                  ga-on="click"
                  ga-event-category="social"
                  ga-event-action="share"
                  ga-event-label="twitter"
                >
                </paper-icon-button>
              </div>
              <div class="share">
                <paper-icon-button
                  class="share-whatsapp"
                  icon="hmi:whatsapp"
                  share="whatsapp"
                  on-click="share"
                  ga-on="click"
                  ga-event-category="social"
                  ga-event-action="share"
                  ga-event-label="whatsapp"
                >
                </paper-icon-button>
              </div>
            </div>
          </div>
        </div>
      </hero-block>
      <div class="container-narrow">
        <marked-element class="post" markdown="[[post.content]]">
          <div slot="markdown-html"></div>
        </marked-element>
        <div class="date">{$ blog.published $}: [[getDate(post.published)]]</div>
      </div>

      <div class="suggested-posts">
        <div class="container-narrow">
          <h3 class="container-title">{$ blog.suggested $}</h3>
          <posts-list posts="[[suggestedPosts]]"></posts-list>
        </div>
      </div>
      <gabung-block></gabung-block>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'post-page';
  }

  static get properties() {
    return {
      active: Boolean,
      route: Object,
      post: Object,
      published: String,
      postData: Object,
      postContent: String,
      suggestedPosts: Array,
      postsList: {
        type: Array,
      },
      postsMap: {
        type: Object,
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
    };
  }

  stateChanged(state: import('../redux/store').State) {
    this.setProperties({
      viewport: state.ui.viewport,
      postsList: state.blog.list,
      postsMap: state.blog.obj,
      postsFetching: state.blog.fetching,
      postsFetchingError: state.blog.fetchingError,
    });
  }

  static get observers() {
    return ['_postDataObserver(postData.id, postsList)'];
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.postsFetching && (!this.postsList || !this.postsList.length)) {
      store.dispatch(newsActions.fetchList());
    }
  }

  handleMarkdownFileFetch(event) {
    if (event.detail.response) {
      this.set('postContent', event.detail.response);
    }
  }

  _postDataObserver(postId, postsList) {
    if (!this.postsList || !this.postsList.length || !this.postsMap[this.postData.id]) {
      return;
    }

    const post = this.postsMap[this.postData.id];
    this.set('post', post);
    this.set('postContent', post.content);
    this.set(
      'suggestedPosts',
      this.postsList.filter((post) => post.id !== this.postData.id).slice(0, 3)
    );
  }

  getDate(date) {
    return getDate(date);
  }

  share(e) {
    return share(e);
  }
}

window.customElements.define(PostPage.is, PostPage);
