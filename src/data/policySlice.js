import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

const url = "https://api-sandbox.coterieinsurance.com/v1/commercial/applications";
const authToken = '73920c6f-d530-419c-87b3-4f4762e05e9d';

export const fetchQualifiedPolicies = createAsyncThunk('policy/fetchQualifiedPolicies', async (policyApplicationDetails) => {
  const config = {
    method: 'POST',
    headers: new Headers({
      'Authorization': `token ${authToken}`, 
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(policyApplicationDetails)
  };
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      console.log('errx1')
      throw new Error(`Bad HTTP Status error: ${response.status}`);
    } 
    const data = await response.json();
    return data.availablePolicyTypes;
  } catch (error) {
    if (error.message.startsWith('Bad HTTP Status error')) {
      throw new Error(error);
    } else {
      throw new Error(`Networking error: ${error}`);
    }
  }
});

export const policySlice = createSlice({
  name: 'policy',
  initialState: {
    applied: {},
    qualified: [],
    errorMessage: '',
    loading: true,
  },
  reducers: {
    policyApplied: {
      reducer(state, action) {
        return {...state, applied: action.payload };
      },
      prepare(businessName, industryId, contactEmail, grossAnnualSales, annualPayroll, numEmployees, zip) {
        return {
          payload: {
            businessName,
            industryId,
            contactEmail,
            grossAnnualSales,
            annualPayroll,
            numEmployees,
            zip,
          }
        }
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQualifiedPolicies.fulfilled, (state, action) => {
        return {...state, qualified: action.payload, loading: false };
      })
      .addCase(fetchQualifiedPolicies.rejected, (state, action) => {
        return {...state, errorMessage: action.error.message, loading: false };
      })
      .addCase(fetchQualifiedPolicies.pending, (state) => {
        return {...state, loading: true };
      })      
  }
});

export const { policyApplied } = policySlice.actions;

export const selectPolicyApplication = (state) => state.policy.applied;
export const selectQualifiedPolicies = (state) => state.policy.qualified;
export const selectErrorMessage = (state) => state.policy.errorMessage;
export const selectLoading = (state) => state.policy.loading;

export default policySlice.reducer;
