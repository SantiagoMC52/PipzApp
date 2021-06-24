/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '../../utils/test-utils';
import Ticket from './index';

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

describe('Ticket Component', () => {
  test('should contain text Order ticket', () => {
    render(<Ticket />, container);
    expect(screen.getByText(/Order ticket/i)).toBeInTheDocument();
  });

  test('should exit', () => {
    render(<Ticket />);

    fireEvent.click(screen.getByTestId('exitBtn'), {
      target: { value: 'exit button' }
    });
  });
});
