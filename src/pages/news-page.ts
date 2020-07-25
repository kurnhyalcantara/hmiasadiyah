import '@polymer/app-route/app-route';
import '@polymer/iron-pages';
import { html, PolymerElement } from '@polymer/polymer';
import { routingActions } from '../redux/actions';
import { scrollToY } from '../utils/scrolling';
import { ReduxMixin } from '../mixins/redux-mixin';
import './news-list-page';
import './post-page';

class NewsPage extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          height: 100%;
        }

        iron-pages {
          min-height: 100%;
        }
      </style>
      <app-route
        route="[[_route]]"
        pattern="/:page"
        data="{{routeData}}"
        tail="{{subRoute}}"
      ></app-route>

      <iron-pages
        attr-for-selected="data-route"
        selected="[[routeData.page]]"
        selected-attribute="active"
      >
        <news-list-page data-route></news-list-page>
        <post-page data-route="posts" route="[[subRoute]]"></post-page>
      </iron-pages>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'news-page';
  }

  active = false;
  route = {};

  private routeData: { page?: string } = {};
  private subRoute: Object;
  private _route: Object;

  static get properties() {
    return {
      route: Object,
      active: Boolean,
    };
  }

  static get observers() {
    return ['_routeChanged(active, route)'];
  }

  _routeChanged(active, route) {
    if (active && route) {
      scrollToY(0, 200);
      this.set('subRoute', {});
      this.set('_route', route);
      routingActions.setSubRoute(this.routeData.page);
    }
  }
}

window.customElements.define(NewsPage.is, NewsPage);
