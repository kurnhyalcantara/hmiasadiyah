import { fireEvent } from '@testing-library/dom';
import { html } from 'lit-html';
import { mocked } from 'ts-jest/utils';
import { fixture } from '../../__tests__/helpers/fixtures';
import { openDialog } from '../store/dialogs/actions';
import { store } from '../store';
import { SIGN_IN } from '../store/user/types';
import './auth-required';
import { AuthRequired } from './auth-required';
import { DIALOGS } from '../store/dialogs/types';

jest.mock('../store/dialogs/actions');

const mockOpenDialog = mocked(openDialog);

describe('auth-required', () => {
  let element!: AuthRequired;
  let shadowRoot!: ShadowRoot;

  beforeAll(async () => {
    const render = await fixture<AuthRequired>(
      html`
        <auth-required>
          <p slot="prompt">Please sign in</p>
          <div>Welcome</div>
        </auth-required>
      `
    );

    element = render.element;
    shadowRoot = render.shadowRoot;
  });

  beforeEach(() => {
    mockOpenDialog.mockClear();
  });

  it('should be registered', () => {
    expect(customElements.get('auth-required')).toBeDefined();
  });

  it('shows unauthenticated prompt', () => {
    expect(shadowRoot.querySelector<HTMLDivElement>('mwc-button')).not.toHaveAttribute('hidden');
    const slots = shadowRoot.querySelectorAll('slot');
    expect(slots).toHaveLength(2);
    expect(slots[0]).not.toHaveAttribute('hidden');
    expect(slots[0]).toHaveAttribute('name', 'prompt');
    expect(slots[0].assignedElements()[0]).toHaveTextContent('Please sign in');
    expect(slots[1]).toHaveAttribute('hidden');
    expect(slots[1]).not.toHaveAttribute('name');
    expect(slots[1].assignedElements()[0]).toHaveTextContent('Welcome');
  });

  it('opens dialog on tap', () => {
    fireEvent.click(shadowRoot.querySelector('mwc-button')!);
    expect(mockOpenDialog).toHaveBeenCalledTimes(1);
    expect(mockOpenDialog).toHaveBeenCalledWith(DIALOGS.SIGNIN);
  });

  it('shows authenticated content', async () => {
    store.dispatch({
      type: SIGN_IN,
      user: { uid: '1', signedIn: true },
    });
    await element.updateComplete;
    expect(shadowRoot.querySelector<HTMLDivElement>('mwc-button')).toHaveAttribute('hidden');
    const slots = shadowRoot.querySelectorAll('slot');
    expect(slots).toHaveLength(2);
    expect(slots[0]).toHaveAttribute('hidden');
    expect(slots[1]).not.toHaveAttribute('hidden');
  });
});
