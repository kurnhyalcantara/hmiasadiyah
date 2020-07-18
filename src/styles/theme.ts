import { css } from 'lit-element';

export const theme = css`
  :host {
    --dark-primary-color: #057c2f;
    --default-primary-color: #069539;
    --focused-color: #046c28;
    --light-primary-color: #0ae757;
    --text-primary-color: #ffffff;
    --accent-color: #60f704;
    --primary-background-color: #ffffff;
    --primary-text-color: #2a2a2a;
    --secondary-text-color: #525252;
    --disabled-text-color: #858585;
    --divider-color: #e0e0e0;
    --footer-background-color: #f5f5f5;
    --footer-text-color: #555555;
    --twitter-color: #4099ff;
    --facebook-color: #3b5998;
    --border-light-color: #e2e2e2;
    --error-color: #e93116;

    /* Custom */
    --default-background-color: #ffffff;
    --secondary-background-color: #f5f5f5;
    --additional-background-color: #f7f7f7;
    --contrast-additional-background-color: #e8e8e8;
    --animation: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    --slideAnimation: 0.4s cubic-bezier(0, 0, 0.2, 1);
    --border-radius: 20px;
    --box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    --box-shadow-primary-color: 0 3px 3px -2px rgba(103, 58, 183, 0.3),
      0 3px 4px 0 rgba(103, 58, 183, 0.3), 0 1px 8px 0 rgba(103, 58, 183, 0.3);
    --box-shadow-primary-color-hover: 0 1px 3px -2px rgba(103, 58, 183, 0.4),
      0 4px 5px 0 rgba(103, 58, 183, 0.4), 0 2px 9px 0 rgba(103, 58, 183, 0.4);
    --font-family: -apple-system, BlinkMacSystemFont, 'Ruda', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    --max-container-width: 1280px;

    --primary-color-transparent: rgba(92, 248, 147, 0.1);
    --primary-color-light: rgba(92, 248, 147, 0.8);
    --primary-color-white: #ede7f6;

    /* Gradient */
    --primary-gradient: linear-gradient(
      135deg,
      var(--default-primary-color) 0%,
      var(--light-primary-color) 100%
    );
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: var(--font-family);
    text-rendering: optimizeLegibility;
    color: var(--primary-text-color);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: bolder;
  }

  h1 {
    padding: 8px 8px 24px 14px;
    font-size: 24px;
    line-height: 30px;
    font-weight: 500;
  }

  a {
    color: var(--default-primary-color);
    text-decoration: none;
    transition: border-color var(--animation);
  }

  paper-button {
    font-family: 'Ruda';
    padding: 0.7em 1.2em;
    border-radius: 100px;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
    color: #fff;
    transition: background-color var(--animation);
  }

  paper-button:hover {
    background-color: var(--primary-color-transparent);
  }

  paper-button[disabled] {
    cursor: default;
    background-color: var(--primary-color-transparent);
    opacity: 0.8;
  }

  paper-button[primary] {
    background: var(--primary-gradient);
  }

  paper-button[primary]:hover {
    background-color: var(--primary-color-light);
  }

  paper-button[primary][invert] {
    color: var(--default-primary-color);
    background: var(--primary-background-color);
  }

  paper-button[primary][invert]:hover {
    background-color: var(--primary-color-white);
  }

  paper-button[primary-text] {
    color: var(--default-primary-color);
    background: transparent;
  }

  paper-button[primary-text]:hover {
    background: var(--primary-color-transparent);
  }

  paper-button[stroke] {
    color: var(--text-primary-color);
    background: transparent;
    border: 1px solid var(--text-primary-color);
  }

  paper-button[stroke]:hover {
    background-color: var(--primary-color-transparent);
  }

  paper-button iron-icon {
    --iron-icon-height: 20px;
    --iron-icon-width: 20px;
  }

  paper-button.icon-right iron-icon {
    margin-left: 16px;
  }

  paper-button.icon-left iron-icon {
    margin-right: 12px;
  }

  paper-button.animated iron-icon {
    transition: transform var(--animation);
  }

  paper-button.animated.icon-right:hover iron-icon {
    transform: translateX(4px);
  }

  paper-button.animated.icon-left:hover iron-icon {
    transform: translateX(-4px);
  }

  paper-tab {
    font-family: 'Ruda';
    font-weight: bolder;
  }

  .container,
  .container-narrow {
    margin: 0 auto;
    padding: 24px 16px;
    max-width: var(--max-container-width);
  }

  .container-narrow {
    max-width: 800px;
  }

  .container-title {
    margin-bottom: 18px;
    font-size: 32px;
    font-style: bolder;
    color: var(--default-primary-color);
  }

  .container-title::after {
    content: '';
    display: block;
    height: 5px;
    width: 80px;
    background-image: var(--primary-gradient);
  }

  .big-icon {
    --iron-icon-height: 48px;
    --iron-icon-width: 48px;
  }

  .card {
    max-width: 400px;
    border-radius: 20px;
    background: transparent;
    box-shadow: 1px 1px 1px var(--default-primary-color), -1px -1px 2px var(--default-primary-color);
  }

  .card:hover {
    box-shadow: 1px 1px 4px var(--default-primary-color), -1px -1px 5px var(--default-primary-color);
  }

  .tag {
    height: 32px;
    padding: 8px 12px;
    font-size: 12px;
    color: currentColor;
    background: white;
    border: 1px solid currentColor;
    border-radius: 32px;
  }

  @media (min-width: 640px) {
    .container,
    .container-narrow {
      padding: 32px;
    }
  }

  @media (max-width: 760px) {
    .container-title {
      font-size: 28px;
    }
  }
`;
