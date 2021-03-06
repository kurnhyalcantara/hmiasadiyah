import '@polymer/iron-location/iron-location';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './content-loader';
import './shared-styles';

class HeaderBottomToolbar extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          background-color: var(--primary-background-color);
        }

        app-toolbar {
          margin: 0 auto;
          padding: 0 16px;
          height: auto;
          max-width: var(--max-container-width);
        }

        .nav-items {
          --paper-tabs-selection-bar-color: var(--default-primary-color);
          --paper-tabs: {
            height: 64px;
          }
          width: 100%;
        }

        .nav-item a {
          padding: 0 14px;
          color: var(--primary-text-color);
        }

        @media (min-width: 640px) {
          app-toolbar {
            padding: 0 36px;
          }
        }
      </style>

      <iron-location query="{{queryParams}}"></iron-location>

      <app-toolbar class="bottom-toolbar">
        <content-loader
          class="nav-items"
          card-padding="15px"
          card-width="105px"
          card-margin="0 14px 0 0"
          card-height="64px"
          avatar-size="0"
          avatar-circle="0"
          title-top-position="20px"
          title-height="24px"
          title-width="75%"
          load-from="-240%"
          load-to="350%"
          blur-width="80px"
          items-count="{$ contentLoaders.schedule.itemsCount $}"
          layout
          horizontal
          hidden$="[[contentLoaderVisibility]]"
        >
        </content-loader>

        <paper-tabs
          class="nav-items"
          selected="[[route.subRoute]]"
          attr-for-selected="sel"
          hidden$="[[!contentLoaderVisibility]]"
          scrollable
          hide-scroll-buttons
          noink
        >
          <paper-tab class="nav-item" sel="all-schedule" link>
            <a
              href$="[[_addQueryParams('all-schedule', queryParams)]]"
              layout
              vertical
              center-center
              >{$ allSchedule.title $}</a
            >
          </paper-tab>
          <template is="dom-repeat" items="[[schedule]]" as="month">
            <paper-tab class="nav-item" sel="[[month.month]]" link>
              <a href$="[[_addQueryParams(month.month, queryParams)]]" layout vertical center-center
                >[[month.month]]</a
              >
            </paper-tab>
          </template>
        </paper-tabs>
      </app-toolbar>
    `;
  }

  static get is() {
    return 'header-bottom-toolbar';
  }

  private route: string;
  private schedule = [];
  private contentLoaderVisibility = false;
  private user = {};

  static get properties() {
    return {
      route: String,
      schedule: Array,
      queryParams: String,
      contentLoaderVisibility: {
        type: Boolean,
        value: false,
      },
      user: Object,
    };
  }

  stateChanged(state: import('../redux/store').State) {
    return this.setProperties({
      route: state.routing,
      schedule: state.schedule,
      user: state.user,
    });
  }

  static get observers() {
    return ['_scheduleChanged(schedule)'];
  }

  connectedCallback() {
    super.connectedCallback();
    // TODO: Remove any
    (window as any).HMIAPP.Elements.StickyHeaderToolbar = this;
  }

  _scheduleChanged(schedule) {
    if (schedule.length) {
      this.contentLoaderVisibility = true;
    }
  }

  _addQueryParams(tab, queryParams) {
    return `/schedule/${tab}${queryParams ? `?${queryParams}` : ''}`;
  }
}

customElements.define(HeaderBottomToolbar.is, HeaderBottomToolbar);
