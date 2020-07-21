import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-radio-button/paper-radio-button';
import '../elements/footer-block';
import '../elements/hero-block';
import '../elements/polymer-helmet';

class DaftarPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          color: var(--secondary-text-color);
          display: block;
          --paper-input-container-focus-color: var(--default-primary-color);
          --paper-input-container-color: var(--secondary-text-color);
          --paper-radio-button-checked-color: var(--default-primary-color);
        }

        .form-header {
          display: block;
          max-height: 56px;
          padding: 8px 12px;
          color: var(--text-primary-color);
          background-color: var(--default-primary-color);
        }

        .form-container {
          padding: 16px 16px;
          margin: 0;
        }

        paper-input {
          margin: 16px 0;
          font-family: var(--font-family);
        }

        paper-input:first-of-type {
          margin-top: 0;
        }

        .form-semi {
          padding: 0 16px;
        }

        .action-buttons {
          margin: 32px 24px 24px;
        }

        @media (min-width: 640px) {
          .form-container {
            padding: 16px 72px;
          }

          .narrow {
            max-width: 320px;
          }
        }
      </style>

      <polymer-helmet
        title="{$ heroSettings.daftar.title $} | {$ title $}"
        description="{$ heroSettings.daftar.metaDescription $}"
        active="[[active]]"
      ></polymer-helmet>

      <hero-block
        background-image="{$ heroSettings.daftar.background.image $}"
        background-color="{$ heroSettings.daftar.background.color $}"
        font-color="{$ heroSettings.daftar.fontColor $}"
        active="[[active]]"
      >
        <div class="hero-title">{$ heroSettings.daftar.title $}</div>
        <p class="hero-description">{$ heroSettings.daftar.description $}</p>
      </hero-block>
      <div class="form-header">{$ formPendaftaran.section1.title $}</div>
      <div class="form-container">
        <paper-input
          id="fullName"
          class="narrow"
          on-touchend="_focus"
          label="{$ formPendaftaran.section1.fullName $}"
          value="{{fullname}}"
          autocomplete="off"
        >
        </paper-input>
        <paper-input
          id="birth"
          class="narrow"
          on-touchend="_focus"
          label="{$ formPendaftaran.section1.birth $}"
          value="{{birth}}"
          autocomplete="off"
        >
        </paper-input>
        <div class="gender">{$ formPendaftaran.section1.gender.label $}</div>
        <paper-radio-button>{$ formPendaftaran.section1.gender.male $}</paper-radio-button>
        <paper-radio-button>{$ formPendaftaran.section1.gender.female $}</paper-radio-button>
        <paper-input
          id="address"
          on-touchend="_focus"
          label="{$ formPendaftaran.section1.address $}"
          value="{{phone}}"
          autocomplete="off"
        >
        </paper-input>
        <paper-input
          id="phone"
          class="narrow"
          on-touchend="_focus"
          label="{$ formPendaftaran.section1.phone $}"
          value="{{address}}"
          autocomplete="off"
        >
        </paper-input>
      </div>
      <div class="form-header">{$ formPendaftaran.section2.title $}</div>
      <div class="form-container">
        <paper-input
          id="university"
          class="narrow"
          on-touchend="_focus"
          label="{$ formPendaftaran.section2.university.label $}"
          value="{$ formPendaftaran.section2.university.value $}"
        >
        </paper-input>
        <div class="faculty">{$ formPendaftaran.section2.faculty.label $}</div>
        <paper-radio-button>{$ formPendaftaran.section2.faculty.ftk $}</paper-radio-button>
        <paper-radio-button>{$ formPendaftaran.section2.faculty.fsh $}</paper-radio-button>
        <paper-radio-button>{$ formPendaftaran.section2.faculty.afi $}</paper-radio-button>
        <paper-input
          id="into"
          class="narrow"
          on-touchend="_focus"
          label="{$ formPendaftaran.section2.into $}"
          value="{{into}}"
          autocomplete="off"
        >
        </paper-input>
      </div>
      <div class="form-header">{$ formPendaftaran.section3.title $}</div>
      <div class="form-container">
        <div class="ketika-sma">{$ formPendaftaran.section3.sma.title $}</div>
        <div class="form-semi">
          <paper-input
            id="sma1"
            class="narrow"
            on-touchend="_focus"
            label="{$ formPendaftaran.section3.sma.label $}"
            value="{{sma1}}"
          >
          </paper-input>
          <paper-input
            id="sma2"
            class="narrow"
            on-touchend="_focus"
            label="{$ formPendaftaran.section3.sma.label $}"
            value="{{sma2}}"
          >
          </paper-input>
          <paper-input
            id="sma3"
            class="narrow"
            on-touchend="_focus"
            label="{$ formPendaftaran.section3.sma.label $}"
            value="{{sma3}}"
          >
          </paper-input>
        </div>
        <div class="ketika-kampus">{$ formPendaftaran.section3.kampus.title $}</div>
        <div class="form-semi">
          <paper-input
            id="kampus1"
            class="narrow"
            on-touchend="_focus"
            label="{$ formPendaftaran.section3.kampus.label $}"
            value="{{kampus1}}"
          >
          </paper-input>
          <paper-input
            id="kampus2"
            class="narrow"
            on-touchend="_focus"
            label="{$ formPendaftaran.section3.kampus.label $}"
            value="{{kampus2}}"
          >
          </paper-input>
          <paper-input
            id="kampus3"
            class="narrow"
            on-touchend="_focus"
            label="{$ formPendaftaran.section3.kampus.label $}"
            value="{{kampus3}}"
          >
          </paper-input>
        </div>
      </div>
      <div class="form-header">{$ formPendaftaran.section4.title $}</div>
      <div class="form-container">
        <paper-input
          id="reason"
          on-touchend="_focus"
          label="{$ formPendaftaran.section4.reason $}"
          value="{{reason}}"
        >
      </div>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'daftar-page';
  }

  static get properties() {
    return {
      active: Boolean,
    };
  }

  _focus(e) {
    e.target.focus();
  }
}

window.customElements.define(DaftarPage.is, DaftarPage);
