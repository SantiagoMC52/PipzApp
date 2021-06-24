/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '../../utils/test-utils';
import Pickup from './index';

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

describe('Pickup Component', () => {
  test('should contain text Phone Number', () => {
    render(<Pickup />, container);
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
  });
});

describe('When onchange input name', () => {
  test('should send name', () => {
    render(<Pickup />);

    fireEvent.change(screen.getByTestId('Name'), {
      target: { value: 'Input Name' }
    });
  });

  test('should send phoneNumber', () => {
    render(<Pickup />);

    fireEvent.change(screen.getByTestId('phoneNumber'), {
      target: { value: 'Input phone number' }
    });
  });

  test('should exit', () => {
    render(<Pickup />);

    fireEvent.click(screen.getByTestId('exitBtn'), {
      target: { value: 'exit button' }
    });
  });
});
