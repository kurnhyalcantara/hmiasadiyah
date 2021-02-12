import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './schedule-day';
import './shared-styles';

class AllSchedule extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
        }

        .date {
          margin: 16px;
          font-size: 24px;
        }

        .date:not(:first-of-type) {
          margin-top: 64px;
        }

        @media (min-width: 640px) {
          .date {
            margin-left: 64px;
            font-size: 32px;
          }
        }
      </style>

      <template is="dom-repeat" items="[[schedule]]" as="month">
        <div class="date">[[month.timeslots.dateReadable]]</div>

        <schedule-day
          name$="[[month.month]]"
          month="[[month]]"
          user="[[user]]"
          featured-sessions="[[featuredSessions]]"
          selected-filters="[[selectedFilters]]"
          viewport="[[viewport]]"
          query-params="[[queryParams]]"
        ></schedule-day>
      </template>
    `;
  }

  static get is() {
    return 'all-schedule';
  }

  private schedule = [];
  private featuredSchedule = [];
  private featuredSessions = {};
  private selectedFilters = {};
  private queryParams: string;
  private viewport = {};
  private user = {};

  static get properties() {
    return {
      schedule: Array,
      featuredSchedule: Array,
      featuredSessions: Object,
      selectedFilters: Object,
      queryParams: String,
      viewport: Object,
      user: Object,
    };
  }

  static get observers() {
    return ['_filterSchedule(schedule, featuredSessions)'];
  }

  _filterSchedule(schedule, featuredSessions) {
    if (schedule.length) {
      this.featuredSchedule = schedule.map((month) =>
        Object.assign({}, month, {
          timeslots: month.timeslots.map((timeslot) =>
            Object.assign({}, timeslot, {
              sessions: timeslot.sessions.map((sessionBlock) =>
                Object.assign({}, sessionBlock, {
                  items: sessionBlock.items.filter((session) => featuredSessions[session.id]),
                })
              ),
            })
          ),
        })
      );
    }
  }
}

customElements.define(AllSchedule.is, AllSchedule);
