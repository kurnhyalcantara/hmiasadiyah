export enum PROVIDERS {
  'https://accounts.google.com' = 'https://accounts.google.com',
  'google.com' = 'google.com',
  'https://www.facebook.com' = 'https://www.facebook.com',
  'facebook.com' = 'facebook.com',
  'https://twitter.com' = 'https://twitter.com',
  'twitter.com' = 'twitter.com',
}

export const getFederatedProvider = (provider: PROVIDERS) => {
  switch (provider) {
    case 'https://accounts.google.com':
    case 'google.com': {
      const provider = new window.firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return provider;
    }
    case 'https://www.facebook.com':
    case 'facebook.com': {
      const provider = new window.firebase.auth.FacebookAuthProvider();
      provider.addScope('email');
      provider.addScope('public_profile');
      return provider;
    }
    case 'https://twitter.com':
    case 'twitter.com':
      return new window.firebase.auth.TwitterAuthProvider();
  }
};

export const getProviderCompanyName = (provider: PROVIDERS) => {
  switch (provider) {
    case 'https://accounts.google.com':
    case 'google.com': {
      return 'Google';
    }
    case 'https://www.facebook.com':
    case 'facebook.com': {
      return 'Facebook';
    }
    case 'https://twitter.com':
    case 'twitter.com':
      return 'Twitter';
  }
};
