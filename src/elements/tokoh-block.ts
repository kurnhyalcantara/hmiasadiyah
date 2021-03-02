import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import 'plastic-image';
import './text-truncate';

@customElement('tokoh-block')
export class TokohBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment flex-reverse">
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

        .description {
          color: var(--primary-text-color);
        }

        .name {
          margin-top: 8px;
          line-height: 1.1;
        }

        .job {
          margin-top: 4px;
          font-size: 14px;
          line-height: 1.1;
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
          {% for tokoh in tokohBlock.content %}
            <div class="tokoh">
              <div relative>
                <plastic-image
                  class="photo"
                  srcset="{$ tokoh.photoUrl $}"
                  sizing="cover"
                  lazy-load
                  preload
                  fade
                ></plastic-image>
                <div class="description">
                  <text-truncate lines="2">
                    <h3 class="name">{$ tokoh.name $}</h3>
                  </text-truncate>
                  <text-truncate lines="1">
                    <div class="job">{$ tokoh.job $}</div>
                  </text-truncate>
                </div>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    `;
  }
}

