import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FormSection from './FormSection';
import setupTest from '../util/setupTest';

const inputElDefaultProps = {
  id: 1,
  type: 'text',
  title: 'Business Name',
  description: 'What is the name of your business?',
  name: 'businessName',
  value: '',
  handleForm: jest.fn(),
};

const selectElDefaultProps = {
  id: 2,
  type: 'select',
  title: 'Industry',
  description: 'What industry is your business in?',
  name: 'industry',
  options: [
    {
      id: 1,
      value: '10537',
      displayValue: 'Plumber',
    },
    {
      id: 2,
      value: '10391',
      displayValue: 'Software developer',
    },
    {
      id: 3,
      value: '10415',
      displayValue: 'Lawyer',
    },
    {
      id: 4,
      value: '10109',
      displayValue: 'Handyman',
    },                  
  ],
  value: '',
  handleForm: jest.fn(),   
};

test('if type is text input should be rendered', () => {
  render(<FormSection {...inputElDefaultProps} />);
  const textBox = screen.getByLabelText(/What is the name of your business\?/i);
  expect(textBox).toBeInTheDocument();
});

test('if type is email input should be rendered', () => {
  render(<FormSection {...inputElDefaultProps} type="email" />);
  const textBox = screen.getByLabelText(/What is the name of your business\?/i);
  expect(textBox).toBeInTheDocument();
});

test('if type is number input should be rendered', () => {
  render(<FormSection {...inputElDefaultProps} type="number" />);
  const textBox = screen.getByLabelText(/What is the name of your business\?/i);
  expect(textBox).toBeInTheDocument();
});

test('if type is select, select should be rendered with empty value', () => {
  render(<FormSection {...selectElDefaultProps} />);
  const select = screen.getByRole('combobox');
  expect(select).toHaveValue('');
});

test('for select type, option should update when select box changed', () => {
  setupTest(FormSection, selectElDefaultProps);
  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', {name: 'Software developer'}),
  );
  expect(screen.getByRole('option', { name: 'Software developer' }).selected).toBe(true);
});

test('for input type, value should update when changed', () => {
  setupTest(FormSection, inputElDefaultProps);
  const textBox = screen.getByLabelText(/What is the name of your business\?/i);
  userEvent.type(textBox, 'Coterie');
  expect(textBox).toHaveValue('Coterie');
});
