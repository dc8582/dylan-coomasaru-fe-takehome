import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';

const defaultProps = {
  currentFormSection: 1,
  lastFormSection: 4,
  handleNavButton: jest.fn(),
};

test('first page should only have a next button', () => {
  render(<Navigation {...defaultProps} />);

  const backButton = screen.queryByRole('button', { name: 'Back'});
  expect(backButton).not.toBeInTheDocument();

  const nextButton = screen.queryByRole('button', { name: 'Next'});
  expect(nextButton).toBeInTheDocument();

  const submitButton = screen.queryByRole('button', { name: 'Submit'});
  expect(submitButton).not.toBeInTheDocument();    
});

test('last page should have back & submit buttons, but no next button', () => {
  render(<Navigation {...defaultProps} currentFormSection={4} />);

  const backButton = screen.queryByRole('button', { name: 'Back'});
  expect(backButton).toBeInTheDocument();

  const nextButton = screen.queryByRole('button', { name: 'Next'});
  expect(nextButton).not.toBeInTheDocument();

  const submitButton = screen.queryByRole('button', { name: 'Submit'});
  expect(submitButton).toBeInTheDocument();  
});

test('clicking on next button should call handleNavButton handler with next arg', () => {
  render(<Navigation {...defaultProps} />);
  const nextButton = screen.getByRole('button', { name: 'Next'});
  userEvent.click(nextButton);
  expect(defaultProps.handleNavButton).toHaveBeenCalledWith('next');
});

test('clicking on back button should call handleNavButton handler with back arg', () => {
  render(<Navigation {...defaultProps} currentFormSection={4} />);
  const backButton = screen.getByRole('button', { name: 'Back'});
  userEvent.click(backButton);
  expect(defaultProps.handleNavButton).toHaveBeenCalledWith('back');
});

test('clicking on submit button should not call handleNavButton handler', () => {
  render(<Navigation {...defaultProps} currentFormSection={4} />);
  const submitButton = screen.getByRole('button', { name: 'Submit'});
  userEvent.click(submitButton);
  expect(defaultProps.handleNavButton).not.toHaveBeenCalled();
});
