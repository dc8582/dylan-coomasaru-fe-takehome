import PropTypes from "prop-types";
import Input from './Input';
import Select from './Select';
import styles from './FormSection.module.css';

const FormSection = ({type, title, description, name, value, handleForm, options}) => {
  let formElement;
  if (['text', 'email', 'number'].includes(type)) {
    formElement = <Input type={type} name={name} value={value} handleForm={handleForm} />;
  }
  if (type === 'select') {
    formElement = <Select type={type} name={name} options={options} value={value} handleForm={handleForm} />;
  }
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <label htmlFor={name} className={styles.description}>{description}</label>
      {formElement}
    </section>
  );
}

FormSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
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

export default FormSection;
