import { customElement } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';
import './hmi-icons';

@customElement('testi-block')
export class TestiBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles flex flex-alignment flex-reverse">
      :host {
        display: block;
      }

      .content {
        margin: 32px 24px;
        display: grid;
        grid-gap: 32px;
        grid-template-columns: repeat(auto-fit, minmax(300px, auto));
      }

      .container-title {
        text-align: center;
      }

      .card {
        display: block;
        position: relative;
        -webkit-transition: all 0.3s;
        margin-top: 32px;
      }

      .pic-container {
        top: -40px;
        width: 100%;
        position: absolute;
        text-align: center;
      }

      .pic-inner {
        border-radius: 50%;
        display: inline-block;
        overflow: hidden;
        width: 81px;
        height: 81px;
        border: 3px solid #fff;
        box-shadow: var(--box-shadow-primary-color);
        background-color: #fff;
      }

      .card-content {
        max-width: 60em;
        margin: 1.5em;
        width: 80%;
        font-style: italic;
      }

      .row {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        max-width: 100%;
        padding: 13%;
        text-align: center;
      }

      .colored-text {
        font-weight: bolder;
        color: var(--default-primary-color);
      }

      p {
        text-align: center;
      }

    </style>

    <div class="container">
      <div class="container-title" layout vertical center>{$ testiBlock.title $}</div>
      <p>{$ testiBlock.description $}</p>
      <div class="content">
        {% for testi in testiBlock.content %}
        <div class="card">
          <div class="pic-container">
            <div class="pic-inner">
              <plastic-image srcset="{$ testi.image $}"></plastic-image>
            </div>
          </div>
          <div class="row">
            <h3 class="colored-text">{$ testi.name $}</h3>
            <h5>{$ testi.job $}</h5>
            <p class="card-content">"{$ testi.testi $}"</p>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
    `;
  }
}

