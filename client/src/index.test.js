/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
// src/index.spec.js
/* eslint-env jest */
import './utils/matchMedia.mock';
import ReactDOM from 'react-dom';
import { ReactStrictMode, rootElement } from './index';

jest.mock('react-dom', () => ({ render: jest.fn() }));
describe('index.js', () => {
  it('renders without crashing', () => {
    ReactDOM.render(ReactStrictMode, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(ReactStrictMode, rootElement);
  });
});
