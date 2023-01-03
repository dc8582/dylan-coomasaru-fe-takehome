import React from 'react';
import PropTypes from "prop-types";
import styles from './Input.module.css';

const Input = ({type, name, value, handleForm}) => {
  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <>
      <input
        type={type}
        value={value}
        id={name}
        name={name}
        className={styles.input}
        onChange={handleForm}
        onKeyDown={handleEnterKey}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleForm: PropTypes.func.isRequired,
};

export default Input;
