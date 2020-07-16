import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin';

class StrukturPengurus extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
        }

        .container {
          padding: 12px auto;
        }

        .kop-title {
          box-sizing: content-box;
          width: 95%;
          color: var(--primary-text-color);
          font-size: 18px;
          font-weight: bolder;
          text-align: center;
        }

        .content {
          margin-top: 3px;
        }

        .content > *:first-of-type {
          font-weight: bolder;
        }

        .divider-element {
          width: 100%;
          border-top-width: 8px;
          border-top-style: solid;
          border-top-color: var(--primary-text-color);
        }

        .container-content {
          margin-top: 5px;
          display: grid;
          grid-gap: 25px;
          grid-template-columns: auto auto;
        }

        .item {
          font-size: 11px;
        }

        @media (min-width: 640px) {
          .kop-title {
            width: 35%;
            text-align: center;
          }

          .divider-element {
            width: 80%;
          }
        }
      </style>

      <div class="container" layout vertical center>
        <div class="kop-title">{$ strukturPengurusBlock.title $}</div>
        <span class="divider-element"></span>
        <div class="container-content">
          <div>
            <div class="content">
              {% for ketua in strukturPengurusBlock.jabatan.ketua %}
              <div class="item">{$ ketua.title $}</div>
              {% endfor %}
            </div>
            <div class="content">
              {% for sekum in strukturPengurusBlock.jabatan.sekum %}
              <div class="item">{$ sekum.title $}</div>
              {% endfor %}
            </div>
            <div class="content">
              {% for bendum in strukturPengurusBlock.jabatan.bendum %}
              <div class="item">{$ bendum.title $}</div>
              {% endfor %}
            </div>
            <div class="content-departement">
              {% for departemen in strukturPengurusBlock.jabatan.departemen %}
              <div class="item">{$ departemen.title $}</div>
              {% endfor %}
            </div>
          </div>
          <div>
            <div class="content">
              {% for ketua in strukturPengurusBlock.jabatan.ketua %}
              <div class="item">{$ ketua.name $}</div>
              {% endfor %}
            </div>
            <div class="content">
              {% for sekum in strukturPengurusBlock.jabatan.sekum %}
              <div class="item">{$ sekum.name $}</div>
              {% endfor %}
            </div>
            <div class="content">
              {% for bendum in strukturPengurusBlock.jabatan.bendum %}
              <div class="item">{$ bendum.name $}</div>
              {% endfor %}
            </div>
            <div class="content-departement">
              {% for departemen in strukturPengurusBlock.jabatan.departemen %}
              <div class="item">{$ departemen.name $}</div>
              {% endfor %}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'struktur-pengurus';
  }
}

window.customElements.define(StrukturPengurus.is, StrukturPengurus);
