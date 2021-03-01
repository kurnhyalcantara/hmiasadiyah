import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-textarea';
import { html, PolymerElement } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@radi-cho/star-rating';
import { ReduxMixin } from '../../mixins/redux-mixin';
import { closeDialog } from '../../store/dialogs/actions';
import { DIALOGS } from '../../store/dialogs/types';
import '../shared-styles';

class FeedbackDialog extends ReduxMixin(mixinBehaviors([IronOverlayBehavior], PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          margin: 0;
          display: block;
          width: 85%;
          max-width: 420px;
          background: var(--primary-background-color);
          box-shadow: var(--box-shadow);

          --paper-input-container-focus-color: var(--default-primary-color);
          --paper-input-container-color: var(--secondary-text-color);
        }

        .dialog-header {
          margin-bottom: 24px;
          padding: 32px 32px 16px;
          background: var(--default-primary-color);
          color: #fff;
          font-size: 20px;
          line-height: 1.5;
        }

        .feedback-content {
          padding: 0px 32px 24px;
        }
      </style>

      <div class="dialog-content" layout vertical>
        <div class="dialog-header">{$ feedback.headline $}</div>
        <div class="feedback-content">
          <feedback-block session-id="[[session.id]]"></feedback-block>
        </div>
      </div>
    `;
  }
  static get is() {
    return 'feedback-dialog';
  }

  static get properties() {
    return {
      data: {
        type: Object,
        observer: '_dataUpdate',
      },
      session: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.addEventListener('iron-overlay-canceled', this._close);
  }

  _dataUpdate() {
    if (this.data?.name === DIALOGS.FEEDBACK) {
      this.session = this.data.data;
    }
  }

  _close() {
    closeDialog();
  }
}

window.customElements.define(FeedbackDialog.is, FeedbackDialog);
