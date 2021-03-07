import { share } from './share';

describe('share', () => {
  let open: jest.SpyInstance<Window | null>;
  const features = (height: number) =>
    `menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=${height}`;
  const twitterUrl = [
    'https://twitter.com/intent/tweet?',
    'text=Check%20out%20Awesome%20Schedule%20at%20%23%7B%24%20hashtag%20%24%7D%3A%20http%3A%2F%2Flocalhost%2F',
  ].join('');

  beforeAll(() => {
    (window as any).href = 'https://example.com/schedule';
    document.title = 'Awesome Schedule';
    open = jest.spyOn(window, 'open').mockImplementation();
  });

  afterEach(() => {
    open.mockClear();
  });

  it('shares to Twitter', () => {
    share({ currentTarget: fixture('twitter') });
    expect(window.open).toHaveBeenCalledWith(twitterUrl, 'share', features(275));
  });

  it('shares to Facebook', () => {
    share({ currentTarget: fixture('facebook') });
    expect(window.open).toHaveBeenCalledWith(
      'https://www.facebook.com/sharer.php?u=http%3A%2F%2Flocalhost%2F&t=Awesome%20Schedule',
      'share',
      features(775)
    );
  });

  it('throws on unknown', () => {
    const event = { currentTarget: fixture('unknown') };
    expect(() => share(event)).toThrow('Unknown share target');
  });
});

const fixture = (share: string) => {
  const dom = document.createElement('button');
  dom.setAttribute('share', share);
  return dom;
};
