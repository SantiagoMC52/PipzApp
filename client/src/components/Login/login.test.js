/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '../../utils/test-utils';
import Login from './index';

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

describe('Login Component', () => {
  test('should contain text username', () => {
    render(<Login />, container);
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
  });
});

describe('Ticket Component', () => {
  test('should send username', () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'username input' }
    });
  });

  test('should send password', () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'password input' }
    });
  });
});
