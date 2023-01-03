import PropTypes from "prop-types";
import styles from './Navigation.module.css';

const Navigation = ({currentFormSection, lastFormSection, handleNavButton}) => {
  return (
    <>
      {currentFormSection > 1 && currentFormSection <= lastFormSection && (
        <button
          className={styles.button}
          type="button"
          onClick={() => handleNavButton('back')}
        >
          Back
        </button>
      )}
      {currentFormSection <= lastFormSection && (
        <button
          className={styles.button}
          type={currentFormSection === lastFormSection ? "submit": "button"}
          onClick={() => currentFormSection !== lastFormSection ? handleNavButton('next') : null}
        >
          { currentFormSection === lastFormSection ? 'Submit': 'Next' }
        </button>
      )}
    </>
  );
};

Navigation.propTypes = {
  currentFormSection: PropTypes.number.isRequired,
  lastFormSection: PropTypes.number.isRequired,
  handleNavButton: PropTypes.func.isRequired,
};

export default Navigation;
