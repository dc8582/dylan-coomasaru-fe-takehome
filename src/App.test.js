import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import { fetchQualifiedPolicies } from "./data/policySlice";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

function setupStore(state) {
  const initialState = {
    policy: state
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  return store;
}

test('The first form question should be displayed on the page', () => {
  const store = setupStore({ qualified: ['GL', 'PL'] });
  render(<Provider store={store}><App /></Provider>);
  const firstQues = screen.getByLabelText(/What is the name of your business\?/i);
  expect(firstQues).toBeInTheDocument();
});

test('clicking next button with an empty field should display a validation error', () => {
  const store = setupStore({ qualified: ['GL', 'PL'] });
  render(<Provider store={store}><App /></Provider>);
  const nextButton = screen.getByRole('button', { name: 'Next'});
  userEvent.click(nextButton);
  const validationError = screen.getByText(/Business Name is required/i);
  expect(validationError).toBeInTheDocument();
});

test('clicking back button with an empty field should display a validation error', () => {
  const store = setupStore({ qualified: ['GL', 'PL'] });
  render(<Provider store={store}><App /></Provider>);
  const textBox = screen.getByLabelText(/What is the name of your business\?/i);
  userEvent.type(textBox, 'Coterie');
  const nextButtonFormPart1 = screen.getByRole('button', { name: 'Next'});
  userEvent.click(nextButtonFormPart1);

  const backButtonFormPart2 = screen.getByRole('button', { name: 'Back'});
  userEvent.click(backButtonFormPart2);

  const validationError = screen.getByText(/Industry is required/i);
  expect(validationError).toBeInTheDocument();
});

test('clicking back button with an validated field should display previous form field', () => {
  const store = setupStore({ qualified: ['GL', 'PL'] });
  render(<Provider store={store}><App /></Provider>);
  const textBox = screen.getByLabelText(/What is the name of your business\?/i);
  userEvent.type(textBox, 'Coterie');
  const nextButtonFormPart1 = screen.getByRole('button', { name: 'Next'});
  userEvent.click(nextButtonFormPart1);

  const industryHeading = screen.getByRole('heading', { name: 'Industry'});
  expect(industryHeading).toBeInTheDocument();
  userEvent.selectOptions(
    screen.getByLabelText(/What industry is your business in\?/i),
    screen.getByRole('option', {name: 'Plumber'}),
  );
  const backButtonFormPart2 = screen.getByRole('button', { name: 'Back'});
  userEvent.click(backButtonFormPart2);

  const bizNameHeading = screen.getByRole('heading', { name: 'Business Name'});
  expect(bizNameHeading).toBeInTheDocument();
});

test('typing incorrect email format should display a validation error', () => {
  const store = setupStore({ qualified: ['GL', 'PL'] });
  render(<Provider store={store}><App /></Provider>);
  const bizNameTextBox = screen.getByLabelText(/What is the name of your business\?/i);
  userEvent.type(bizNameTextBox, 'Coterie');
  const nextButton = screen.getByRole('button', { name: 'Next'});
  userEvent.click(nextButton);

  userEvent.selectOptions(
    screen.getByLabelText(/What industry is your business in\?/i),
    screen.getByRole('option', {name: 'Plumber'}),
  );
  userEvent.click(nextButton);

  const emailTextBox = screen.getByLabelText(/What is your email address\?/i);
  userEvent.type(emailTextBox, 'a');
  userEvent.click(nextButton);

  const validationError = screen.getByText(/Email format is not valid/i);
  expect(validationError).toBeInTheDocument();
});

function setupThunkTests(state) {
  const store = setupStore(state);

  render(<Provider store={store}><App /></Provider>);
  const bizNameTextBox = screen.getByLabelText(/What is the name of your business\?/i);
  userEvent.type(bizNameTextBox, 'Coterie');
  const nextButton = screen.getByRole('button', { name: 'Next'});
  userEvent.click(nextButton);

  userEvent.selectOptions(
    screen.getByLabelText(/What industry is your business in\?/i),
    screen.getByRole('option', {name: 'Plumber'}),
  );
  userEvent.click(nextButton);

  const emailTextBox = screen.getByLabelText(/What is your email address\?/i);
  userEvent.type(emailTextBox, 'email@example.com');
  userEvent.click(nextButton);

  userEvent.selectOptions(
    screen.getByLabelText(/What are the annual sales for your business\?/i),
    screen.getByRole('option', {name: '$50k'}),
  );
  userEvent.click(nextButton);

  userEvent.selectOptions(
    screen.getByLabelText(/What is the annual payroll for your business\?/i),
    screen.getByRole('option', {name: '$100k'}),
  );
  userEvent.click(nextButton);

  const numEmployeesTextBox = screen.getByLabelText(/How many employees does your business have\?/i);
  userEvent.type(numEmployeesTextBox, '20');
  userEvent.click(nextButton);

  const zipCodeTextBox = screen.getByLabelText(/What is your zip code\?/i);
  userEvent.type(zipCodeTextBox, '10010');
  const submitButton = screen.getByRole('button', { name: 'Submit'});
  userEvent.click(submitButton);

  const policiesHeader = screen.getByRole('heading', { name: /Policies you qualify for/i});
  expect(policiesHeader).toBeInTheDocument();

  return store;
}

test('when thunk dispatch is successful, payload should contain policies', async () => {
  const store = setupThunkTests({ qualified: ['GL', 'PL'] });

  const postBody = {
    businessName: 'Coterie',
    contactEmail: 'email@example.com',
    grossAnnualSales: 50_000,
    annualPayroll: 75_000,
    numEmployees: 5,
    industryId: '10537',
    locations: [
      {
        zip: '12345'
      }
    ]
  };

  await store.dispatch(fetchQualifiedPolicies(postBody));
  const actions = store.getActions();
  const idx = actions.length - 1;
  expect(actions[idx].type).toBe('policy/fetchQualifiedPolicies/fulfilled');
  expect(actions[idx].payload[0]).toBe('GL');
  expect(actions[idx].payload[1]).toBe('BOP');
});

test('when thunk dispatch is missing postBody request should be rejected', async () => {
  const store = setupThunkTests({ qualified: ['GL', 'PL'] });

  await store.dispatch(fetchQualifiedPolicies());
  const actions = store.getActions();
  const idx = actions.length - 1;
  expect(actions[idx].type).toBe('policy/fetchQualifiedPolicies/rejected');
});
