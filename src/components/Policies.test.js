import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Policies from './Policies';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('if there are policies, display all on the page', () => {
  const initialState = {
    policy: {
      qualified: ['GL', 'PL'],
      errorMessage: '',
      loading: false,
    }
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);

  render(<Provider store={store}><Policies /></Provider>);
  const policy = screen.queryAllByText(/(General|Professional Liability)|(Business Owners Policy)/i);
  expect(policy).toHaveLength(2);
});

test('if there is an error, it should displayed', () => {
  const initialState = {
    policy: {
      qualified: [],
      errorMessage: 'Error loading data',
      loading: false,
    }
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);

  render(<Provider store={store}><Policies /></Provider>);
  const errorMessage = screen.getByText(/Sorry there was an error/i);
  expect(errorMessage).toBeInTheDocument();
});

test('if there are no policies, spinner should be displayed', () => {
  const initialState = {
    policy: {
      qualified: [],
      errorMessage: '',
      loading: true,
    }
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);

  render(<Provider store={store}><Policies /></Provider>);
  const policy = screen.queryAllByText(/(General|Professional Liability)|(Business Owners Policy)/i);
  expect(policy).toHaveLength(0);
  
  const spinner = screen.queryByTitle(/loading/i);
  expect(spinner).toBeInTheDocument();
});
