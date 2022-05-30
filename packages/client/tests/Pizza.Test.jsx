import {describe, expect, it} from 'vitest';
import Pizza from '../src/Pizza';
import {render, screen} from './utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<Pizza name="test pizza" toppings={[]} />);
    expect(screen.getByText(/test pizza/i)).toBeInTheDocument();
  });
});
