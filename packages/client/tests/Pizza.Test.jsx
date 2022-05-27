import {describe, expect, it} from 'vitest';
import Pizza from '../src/Pizza';
import {render, screen, userEvent} from './utils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<Pizza name="test pizza" toppings={[]} />);
    expect(screen.getByText(/test pizza/i)).toBeInTheDocument();
  });

  it.skip('should increment count on click', async () => {
    render(<Pizza />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument();
  });
});
