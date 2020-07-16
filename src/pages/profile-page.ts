import '@polymer/app-route/app-route';
import '@polymer/iron-icon';
import '@polymer/iron-location/iron-location';
import '@polymer/paper-icon-button';
import '@polymer/paper-progress';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import '../elements/content-loader';
import '../elements/filter-menu';
import '../elements/sejarah-hmi-profile';
import '../elements/profil-hmi-asadiyah';
import '../elements/struktur-pengurus';
import '../elements/gabung-block';
import '../elements/shared-styles';
import '../elements/text-truncate';
import { ReduxMixin } from '../mixins/redux-mixin';
import { SpeakersHoC } from '../mixins/speakers-hoc';

class ProfilePage extends SpeakersHoC(ReduxMixin(PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          height: 100%;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 30px;
          min-height: 80%;
        }

        .container-title {
          margin: 10px;
        }

        .content {
          width: 100%;
        }

        .content-desc {
          width: 100%;
          padding: 20px;
          border-left-width: 2px;
          border-left-style: dotted;
          border-left-color: var(--default-primary-color);
        }

        .content-content {
          text-align: left;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          flex-direction: row;
        }

        .container-content-list {
          padding: 5px;
          border-left: 5px solid var(--default-primary-color);
        }

        .ol-content-list {
          font-size: 16px;
        }

        .li-content-list {
          margin: 3px;
        }

        .link-style-content-list {
          font-weight: bolder;
        }

        .icon-attr {
          color: var(--default-primary-color);
          display: inline-flex;
          -webkit-box-flex: 0;
          flex: 0 0 auto;
          margin-right: 20px;
        }

        .divider-element {
          margin: 20px;
          border-top-style: solid;
          border-top-width: 2px;
          width: 21%;
        }

        h3 {
          margin-block-start: 0;
          margin-block-end: 0;
          color: var(--default-primary-color);
        }

        p {
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
        }

        paper-progress {
          width: 100%;
          --paper-progress-active-color: var(--default-primary-color);
          --paper-progress-secondary-color: var(--default-primary-color);
        }

        @media (min-width: 640px) {
          .container {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          }
        }
      </style>

      <polymer-helmet
        title="{$ heroSettings.profile.title $} | {$ title $}"
        description="{$ heroSettings.profile.metaDescription $}"
        active="[[active]]"
      ></polymer-helmet>

      <hero-block
        background-image="{$ heroSettings.profile.background.image $}"
        background-color="{$ heroSettings.profile.background.color $}"
        font-color="{$ heroSettings.profile.fontColor $}"
        active="[[active]]"
        hide-logo
      >
        <div class="hero-title highlight-font">{$ heroSettings.profile.subTitle $}</div>
        <div class="container-content-list">
          <ul class="ol-content-list">
            {% for contentList in profileHero.link %}
            <li>{$ contentList.title $}</li>
            {% endfor %}
          </ul>
        </div>
      </hero-block>
      <sejarah-hmi-profile></sejarah-hmi-profile>
      <profil-hmi-asadiyah></profil-hmi-asadiyah>
      <struktur-pengurus></struktur-pengurus>
      <gabung-block></gabung-block>
      <footer-block></footer-block>
    `;
  }

  static get is() {
    return 'profile-page';
  }
}

window.customElements.define(ProfilePage.is, ProfilePage);
