import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import { ReduxMixin } from '../mixins/redux-mixin';
import { galleryActions } from '../redux/actions';
import { store } from '../redux/store';
import './shared-styles';

class GalleryBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
        }

        .photos-grid {
          margin: 32px auto;
          display: grid;
          width: 100%;
          min-height: 400px;
          height: calc(100vh - 40px);
          max-height: 750px;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(5, 1fr);
          grid-gap: 2px;
        }

        .grid-item {
          background-color: var(--secondary-background-color);
        }

        .grid-item:first-child {
          grid-area: 1 / 1 / 3 / 4;
        }

        .grid-item:nth-child(2) {
          grid-area: 3 / 1 / 5 / 3;
        }

        .grid-item:nth-child(3) {
          grid-area: 3 / 3 / 3 / 3;
        }

        .grid-item:nth-child(4) {
          grid-area: 4 / 3 / 4 / 3;
        }

        .grid-item:nth-child(5) {
          grid-area: 5 / 1 / 5 / 1;
        }

        .grid-item:nth-child(6) {
          display: none;
        }

        .grid-item:nth-child(7) {
          display: none;
        }

        .grid-item:nth-child(8) {
          display: none;
        }

        .gallery-info {
          padding: 16px;
          background: var(--primary-gradient);
          color: var(--text-primary-color);
          z-index: 1;
          grid-area: 5 / 2 / 5 / 4;
        }

        paper-button {
          margin-top: 16px;
          color: #fff;
          border: 1px solid #fff;
        }

        @media (min-width: 640px) {
          .photos-grid {
            height: calc(100vh - 64px);
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(3, 1fr);
          }

          .grid-item:first-child {
            grid-area: 1 / 1 / 1 / 3;
          }

          .grid-item:nth-child(2) {
            grid-area: 1 / 3 / 2 / 5;
          }

          .grid-item:nth-child(3) {
            grid-area: 1 / 5 / 3 / 5;
          }

          .grid-item:nth-child(4) {
            grid-area: 2 / 1 / 2 / 1;
          }

          .grid-item:nth-child(5) {
            grid-area: 2 / 2 / 2 / 2;
          }

          .grid-item:nth-child(6) {
            grid-area: 3 / 1 / 3 / 3;
            display: block;
          }

          .grid-item:nth-child(7) {
            grid-area: 3 / 3 / 3 / 3;
            display: block;
          }

          .grid-item:nth-child(8) {
            grid-area: 3 / 4 / 3 / 6;
            display: block;
          }

          .gallery-info {
            padding: 24px;
            grid-area: 2 / 3 / 2 / 5;
          }
        }
      </style>

      <div class="photos-grid">
        <template is="dom-repeat" items="[[gallery]]" as="photo">
          <plastic-image
            class="grid-item"
            srcset="[[photo.url]]"
            sizing="cover"
            lazy-load
            preload
            fade
          >
            <a href="[[photo.url]]"></a>
          </plastic-image>
        </template>
        <div class="gallery-info" layout vertical justified>
          <div>
            <h2>{$ galleryBlock.title $}</h2>
            <p>{$ galleryBlock.description $}</p>
          </div>
          <a href="{$ galleryBlock.callToAction.link $}" target="_blank" rel="noopener noreferrer">
            <paper-button stroke>{$ galleryBlock.callToAction.label $}</paper-button>
          </a>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'gallery-block';
  }

  private gallery = [];
  private galleryFetching = false;
  private galleryFetchingError = {};

  static get properties() {
    return {
      gallery: Array,
      galleryFetching: Boolean,
      galleryFetchingError: Object,
    };
  }

  stateChanged(state: import('../redux/store').State) {
    return this.setProperties({
      gallery: state.gallery.list,
      galleryFetching: state.gallery.fetching,
      galleryFetchingError: state.gallery.fetchingError,
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.gallery || !this.gallery.length) {
      store.dispatch(galleryActions.fetchGallery());
    }
  }
}

window.customElements.define(GalleryBlock.is, GalleryBlock);
