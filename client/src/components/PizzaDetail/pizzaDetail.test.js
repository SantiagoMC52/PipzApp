/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '../../utils/test-utils';
import PizzaDetail from './index';

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

describe('PizzaDetail Component', () => {
  test('should contain text There is no pizza with id=', () => {
    render(<PizzaDetail />, container);
    expect(screen.getByText(/There is no pizza with id=/i)).toBeInTheDocument();
  });
});
