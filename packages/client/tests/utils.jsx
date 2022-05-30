// eslint-disable-line unicorn/filename-case
import {cleanup, render} from '@testing-library/react';
import {afterEach} from 'vitest';
import {Provider} from 'urql';
import {never} from 'wonka';
import {MemoryRouter} from 'react-router-dom';

afterEach(() => {
  cleanup();
});

const customRender = (ui, options = {}) =>
  render(ui, {
    // Wrap provider(s) here if needed
    wrapper: ({children}) => <MemoryRouter>{children}</MemoryRouter>,

    ...options,
  });

export function renderWithQuery(ui, executeQuery = () => never) {
  return customRender(ui, {
    wrapper: ({children}) => (
      <MemoryRouter>
        <Provider value={{executeQuery}}>{children}</Provider>
      </MemoryRouter>
    ),
  });
}

export * from '@testing-library/react';
export {default as userEvent} from '@testing-library/user-event';
// Override render export
export {customRender as render};
