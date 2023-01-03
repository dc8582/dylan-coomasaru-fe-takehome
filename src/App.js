import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQualifiedPolicies } from "./data/policySlice";
import { policyApplied } from './data/policySlice';
import FormSection from './components/FormSection';
import Navigation from './components/Navigation';
import Policies from './components/Policies';
import styles from './App.module.css';
import formElements from './data/formElements';

const App = () => {
  const lastFormSection = formElements.length;
  const dispatch = useDispatch();

  const [currentFormSection, setCurrentFormSection] = useState(1);
  const currentFormElement = formElements[currentFormSection - 1];
  const [buttonClicked, setButtonClicked] = useState(null);
  const [formState, setFormState] = useState({
    businessName: "",
    industryId: "",
    contactEmail: "",
    grossAnnualSales: "",
    annualPayroll: "",
    numEmployees: "",
    zip: "",
  });
  const [submitted, setSubmitted] = useState(false);

  //validation
  const [ formValidationErrors, setFormValidationErrors ] = useState({});
  const [ wasValidated, setWasValidated ] = useState(false);
  const handleForm = useCallback(
    ({target: {name, value}}) => {
      setFormState(prevState => ({...prevState, [name]: value}));
    },
    [setFormState,]
  );
  const validateField = (name, title, validationRules) => {
    if (validationRules.includes('required') && !formState[name]) {
      setFormValidationErrors(prevErrors => ({
        ...prevErrors, 
        [name]: `${title} is required`,
      }));
    } else if (validationRules.includes('pattern') && !currentFormElement.pattern.test(formState[name])) {
      setFormValidationErrors(prevErrors => ({
        ...prevErrors, 
        [name]: `${title} format is not valid`,
      }));
    }
    else {
      setFormValidationErrors(prevErrors => ({
        ...prevErrors, 
        [name]: '',
      }));
      setWasValidated(true);
    }
  };

  const handleNavButton = (buttonType) => {
    const { name, title, validationRules } = currentFormElement;
    validateField(name, title, validationRules);
    setButtonClicked(buttonType);
  };
  
  // process next/previous/submit
  useEffect(() => {
    if(wasValidated) {
      setWasValidated(false);
      if (buttonClicked === 'back') setCurrentFormSection(currentFormSection => currentFormSection - 1);
      else if (buttonClicked === 'next') setCurrentFormSection(currentFormSection => currentFormSection + 1);
      else if (buttonClicked === 'submit') {
        //saving completed policy application form data to redux
        const { businessName, industryId, contactEmail, grossAnnualSales, annualPayroll, numEmployees, zip } = formState;
        dispatch(
          policyApplied(businessName, industryId, contactEmail, grossAnnualSales, annualPayroll, numEmployees, zip)
        );

        //redux thunk for fetching qualified policies
        const postBody = {
          businessName,
          contactEmail,
          grossAnnualSales,
          annualPayroll,
          numEmployees,
          industryId,
          locations: [
            {
              zip
            }
          ]
        };
        dispatch(fetchQualifiedPolicies(postBody));

        setSubmitted(true);
      }
    }
  }, [wasValidated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, title, validationRules } = currentFormElement;
    validateField(name, title, validationRules);
    setButtonClicked('submit');
  };

  const formSections = formElements.map(({id, title, description, name, type, options}) => (
    <div key={id}>
      { (currentFormSection === id) &&
      <FormSection
        title={title}
        description={description}
        name={name}
        type={type}
        options={options}
        value={formState[name]}
        handleForm={handleForm}
      />} 
      {formValidationErrors[name] &&
        <div className={styles.error}>{formValidationErrors[name]}</div>}
    </div>
  ));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coterie</h1>
      { !submitted && (
        <form className={styles.bg} onSubmit={handleSubmit} noValidate>
          {formSections}
          <Navigation 
            currentFormSection={currentFormSection} 
            lastFormSection={lastFormSection} 
            handleNavButton={handleNavButton} 
          />
        </form> 
      )}
      { submitted &&
        <Policies />
      }
    </div>
  );
};

export default App;
