import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './hmi-icons';
import './shared-animations';

class ProfilHmiAsadiyah extends ReduxMixin(PolymerElement) {
  static get template() {
    return html` <style include="shared-styles flex flex-alignment flex-reverse">
        :host {
          display: block;
        }

        .content {
          display: grid;
          grid-gap: 15px;
          grid-template-columns: grid-template-columns: repeat(auto-fit, minmax(300px, auto));
        }

        .content-align {
          text-align: center;
        }

        .container-title::after {
          width: 145px;
        }

        .statistic-block {
          width: 100%;
          margin-top: 10px;
          display: grid;
          grid-gap: 32px 16px;
          grid-template-columns: repeat(2, 1fr);
        }

        .numbers {
          font-size: 40px;
        }

        .numbers::after {
          content: '';
          display: block;
          height: 2px;
          width: 64px;
          background: var(--primary-gradient);
        }

        .label {
          font-weight: bolder;
          margin-top: 4px;
        }

        .label1 {
          font-size: 14px;
        }

        @media (min-width: 760px) {
          .content {
            grid-gap: 32px;
            grid-template-columns: auto auto;
          }

          .statistic-block {
            grid-gap: 32px;
          }

          .numbers {
            font-size: 56px;
          }
        }
      </style>
      <div class="container">
        <div class="container-title">{$ profilHmiAsadiyahBlock.title $}</div>
        <div class="content">
          <div class="content-align" layout vertical center>
            <plastic-image srcset="{$ profilHmiAsadiyahBlock.ketuaUmum.image $}"></plastic-image>
            <div class="label">{$ profilHmiAsadiyahBlock.ketuaUmum.name $}</div>
            <div class="label1">{$ profilHmiAsadiyahBlock.ketuaUmum.desc $}</div>
          </div>
          <div>
            {% for desc in profilHmiAsadiyahBlock.description %}
            <p>
              {$ desc.desc $}
              <br />
            </p>
            {% endfor %}
          </div>
        </div>
        <div class="statistic-block">
          {% for stat in profilHmiAsadiyahBlock.statisticBlock %}
          <div class="item">
            <div class="numbers">{$ stat.number $}</div>
            <div class="label">{$ stat.label $}</div>
          </div>
          {% endfor %}
        </div>
      </div>`;
  }

  static get is() {
    return 'profil-hmi-asadiyah';
  }
}

window.customElements.define(ProfilHmiAsadiyah.is, ProfilHmiAsadiyah);
