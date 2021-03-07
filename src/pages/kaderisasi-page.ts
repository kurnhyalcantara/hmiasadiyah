import { html, PolymerElement } from '@polymer/polymer';
import '@fabricelements/skeleton-carousel';
import '../elements/info-pengkaderan';
import '../elements/shared-styles';
class KaderisasiPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          margin-top: -56px;
          display: block;
          height: 100%;
        }

        .carousel-image {
          min-height: 100%;
        }

        @media (min-height: 500px) {
          skeleton-carousel {
            height: calc(100vh + 57px);
            max-height: calc(100vh + 1px);
          }
        }

        @media (min-width: 812px) {
          :host {
            margin-top: -64px;
          }

          skeleton-carousel {
            height: calc(100vh + 65px);
          }
        }
      </style>

      <polymer-helmet
        title="{$ heroSettings.kaderisasi.title $} | {$ title $}"
        description="{$ heroSettings.kaderisasi.metaDescription $}"
        active="[[active]]"
      ></polymer-helmet>
      <skeleton-carousel loop auto>
        <plastic-image
          class="carousel-image"
          srcset="https://storage.googleapis.com/hmi-asadiyah.appspot.com/gallery/photo1.jpg"
          sizing="cover"
          lazy-load
          preload
          fade
          fit
        ></plastic-image>
        <plastic-image
          class="carousel-image"
          srcset="https://storage.googleapis.com/hmi-asadiyah.appspot.com/gallery/photo1.jpg"
          sizing="cover"
          lazy-load
          preload
          fade
          fit
        ></plastic-image>
        <plastic-image
          class="carousel-image"
          srcset="https://storage.googleapis.com/hmi-asadiyah.appspot.com/gallery/photo1.jpg"
          sizing="cover"
          lazy-load
          preload
          fade
          fit
        ></plastic-image>
      </skeleton-carousel>
      <info-pengkaderan></info-pengkaderan>
      <gabung-block></gabung-block>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'kaderisasi-page';
  }

  static get properties() {
    return {
      active: Boolean,
    };
  }
}

window.customElements.define(KaderisasiPage.is, KaderisasiPage);
