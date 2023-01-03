import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

const inputElDefaultProps = {
  type: 'text',
  name: 'businessName',
  value: '',
  handleForm: jest.fn(),
};

test('event.preventDefault should fire when enter key is pressed on input field', () => {
  render(<Input {...inputElDefaultProps} />);
  const textBox = screen.getByRole('textbox');
  const keyDownEvent = createEvent.keyDown(textBox, {key: 'Enter', code: 'Enter', charCode: 13 });
  fireEvent(textBox, keyDownEvent);
  expect(keyDownEvent.defaultPrevented).toBe(true);
});
