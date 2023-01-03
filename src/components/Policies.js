import { useSelector } from 'react-redux';
import { selectQualifiedPolicies, selectErrorMessage, selectLoading } from '../data/policySlice';
import Spinner from './Spinner'
import styles from './Policies.module.css';

const Policies = () => {
  const policyTypes = {
    GL: 'General Liability',
    PL: 'Professional Liability',
    BOP: 'Business Owners Policy',
  };
 
  const qualifiedPolicies = useSelector(selectQualifiedPolicies);
  const errorMessage = useSelector(selectErrorMessage);
  const loading = useSelector(selectLoading);

  return (
    <div className={styles.bg}>
      <h2 className={styles.qualifiedPoliciesTitle}>Policies you qualify for:</h2>

      {loading && <Spinner />}
      {!!qualifiedPolicies.length && qualifiedPolicies.map((policy, idx) => <p key={idx} className={styles.qualifiedPolicy}>{policyTypes[policy]}</p>)}
      {errorMessage && <div><p className={styles.error}>Sorry there was an error: {errorMessage}</p><p><a href="/">Please try again.</a></p></div>}
    </div>
  );
}

export default Policies;
