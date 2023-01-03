import { useState } from 'react';
import { render, screen } from '@testing-library/react';

export default function setupTest(FormComponent, props) {
  let handleForm;
  function TestWrapper() {
    const [value, setValue] = useState(props.value);
    handleForm = jest.fn(e => setValue(e.target.value));
    return <FormComponent {...props} handleForm={handleForm} value={value} />
  }
  render(<TestWrapper/>);
  return { handleForm };
}
