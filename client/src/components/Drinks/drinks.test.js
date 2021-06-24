/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '../../utils/test-utils';
import Drinks from './index';

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

describe('Drinks Component', () => {
  test('should contain text Choose the drinks', () => {
    render(<Drinks />, container);
    expect(screen.getByText(/Choose the drinks/i)).toBeInTheDocument();
  });
});

describe('When click button add drink', () => {
  test('should add a drink', () => {
    const initialState = { drinks: [{ name: 'pepsi' }] };
    render(<Drinks />, { initialState });

    fireEvent.click(screen.getByTestId('drinks'), {
      target: { value: 'addToCart' }
    });
  });
});
