import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';

class FooterNav extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          margin: 0 20px;
        }

        .copyright {
          padding: 15px 0 0;
          float: left;
        }

        .coc {
          display: block;
        }

        .nav-inline {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-logo {
          margin: 10px 30px 0 0;
          height: 36px;
          width: 140px;
          float: left;
        }

        a {
          color: var(--footer-text-color);
          padding-bottom: 2px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          :host {
            margin: 15px 0;
          }
        }

        @media (min-width: 505px) {
          .copyright {
            margin: 0;
            padding: 15px 0 0 0;
            float: right;
            text-align: right;
          }

          .coc {
            display: inline-flex;
          }
        }
      </style>

      <div class="nav-inline" layout flex>
        <a href="{$ organizer.url $}" target="_blank" rel="noopener noreferrer">
          <plastic-image
            class="footer-logo"
            srcset="../../images/logo-monochrome.svg"
            sizing="contain"
            alt="{$ organizer.name $}"
            lazy-load
          ></plastic-image>
        </a>

        <div class="copyright">
          [[_getYear()]] &copy; Departemen Komunikasi dan Informasi
          <a href="/" target="_blank" rel="noopener noreferrer">HMI Komisariat As'adiyah</a>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'footer-nav';
  }

  _getYear() {
    return new Date().getFullYear();
  }
}

window.customElements.define(FooterNav.is, FooterNav);
