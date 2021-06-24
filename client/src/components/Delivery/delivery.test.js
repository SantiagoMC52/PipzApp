/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '../../utils/test-utils';
import Delivery from './index';

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

describe('Delivery Component', () => {
  test('should contain text name', () => {
    render(<Delivery />, container);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });
});

describe('When onchange', () => {
  test('should send name', () => {
    render(<Delivery />);

    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'input name' }
    });
  });

  test('should send phone number', () => {
    render(<Delivery />);

    fireEvent.change(screen.getByTestId('phoneNumber'), {
      target: { value: 'input telf' }
    });
  });

  test('should send phone number', () => {
    render(<Delivery />);

    fireEvent.change(screen.getByTestId('direction'), {
      target: { value: 'input direction' }
    });
  });

  test('should send number', () => {
    render(<Delivery />);

    fireEvent.change(screen.getByTestId('number'), {
      target: { value: 'input number' }
    });
  });

  test('should send floor', () => {
    render(<Delivery />);

    fireEvent.change(screen.getByTestId('floor'), {
      target: { value: 'input floor' }
    });
  });

  test('should send door', () => {
    render(<Delivery />);

    fireEvent.change(screen.getByTestId('door'), {
      target: { value: 'input door' }
    });
  });

  test('should exit', () => {
    render(<Delivery />);

    fireEvent.click(screen.getByTestId('exitBtn'), {
      target: { value: 'exit button' }
    });
  });
});
