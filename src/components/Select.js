import PropTypes from "prop-types";
import styles from './Select.module.css';

const Select = ({name, options, value, handleForm}) => {
  return (
    <select 
    className={styles.select}
    value={value}
    id={name}
    name={name}
    onChange={handleForm}
    >
      <option value=""></option>
      {options.map(({id, value, displayValue}) => (
        <option key={id} value={value}>{displayValue}</option>
      ))}
    </select>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]).isRequired,
      displayValue: PropTypes.string.isRequired,
    })
  ),  
  value: PropTypes.string.isRequired,
  handleForm: PropTypes.func.isRequired,
};

export default Select;
