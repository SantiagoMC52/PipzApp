/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '../../utils/test-utils';
import Pizzas from './index';

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

describe('Pizzas Component', () => {
  test('should contain text Choose the pizzas', () => {
    render(<Pizzas />, container);
    expect(screen.getByText(/Choose the pizzas/i)).toBeInTheDocument();
  });

  test('should contain a tag with title tag-test', () => {
    render(<Pizzas />);
    const headerFour = screen.getByTitle('tag-test');
    expect(headerFour).toBeTruthy();
  });
});
