/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '../../utils/test-utils';
import Cart from './index';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Cart Component', () => {
  test('should contain text Products in the cart ', () => {
    render(<Cart />, container);
    expect(screen.getByText(/Products in the cart/i)).toBeInTheDocument();
  });

  test('should exit', () => {
    render(<Cart />);

    fireEvent.click(screen.getByTestId('payment'), {
      target: { value: 'payment' }
    });
  });
});
