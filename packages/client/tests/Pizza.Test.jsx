import {describe, expect, it} from 'vitest';
import Pizza from '../src/Pizza';
import {render, screen} from './utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(
      <Pizza
        id="pizza1"
        name="test pizza"
        description="this pizza is perfect for tests"
        toppings={[]}
      />,
    );
    expect(screen.getByText(/test pizza/i)).toBeInTheDocument();
  });
});
