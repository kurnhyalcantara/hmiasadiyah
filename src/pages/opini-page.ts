import '@polymer/app-route/app-route';
import '@polymer/iron-pages';
import { html, PolymerElement } from '@polymer/polymer';
import { routingActions } from '../redux/actions';
import { scrollToY } from '../utils/scrolling';
import { ReduxMixin } from '../mixins/redux-mixin';
import '../elements/gabung-block';
import '../elements/footer-block';
import './opini-list-page';
import './opinion-page';

class OpiniPage extends ReduxMixin(PolymerElement) {
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
        <opini-list-page data-route></opini-list-page>
        <opinion-page data-route="articles" route="[[subRoute]]"></opinion-page>
      </iron-pages>
      <gabung-block></gabung-block>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'opini-page';
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

window.customElements.define(OpiniPage.is, OpiniPage);
