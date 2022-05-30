import {describe, expect, it} from 'vitest';
import {never, fromValue} from 'wonka';
import {CombinedError} from 'urql';
import Pizzas from '../src/Pizzas';
import {renderWithQuery, screen} from './utils';

describe('Renders pizza list', () => {
  it('Loading message while waiting for query', () => {
    renderWithQuery(<Pizzas />, () => never);
    expect(screen.getByText(/loading\.{3}/i)).toBeInTheDocument();
  });

  it('Displays each pizza', () => {
    const data = {
      pizzaList: [{name: 'test pizza', id: 1, toppings: []}],
    };
    renderWithQuery(<Pizzas />, () => fromValue({data}));
    expect(screen.getByText(/test pizza/i)).toBeInTheDocument();
  });

  it('Error message on error', () => {
    renderWithQuery(<Pizzas />, () =>
      fromValue({error: new CombinedError({networkError: new Error('boom')})}),
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });
});
