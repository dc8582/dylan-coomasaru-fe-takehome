const formElements = [
  {
    id: 1,
    type: 'text',
    title: 'Business Name',
    description: 'What is the name of your business?',
    name: 'businessName',
    validationRules: ['required'],
  },
  {
    id: 2,
    type: 'select',
    title: 'Industry',
    description: 'What industry is your business in?',
    name: 'industryId',
    options: [
      {
        id: 1,
        value: '10537',
        displayValue: 'Plumber',
      },
      {
        id: 2,
        value: '10391',
        displayValue: 'Software developer',
      },
      {
        id: 3,
        value: '10415',
        displayValue: 'Lawyer',
      },
      {
        id: 4,
        value: '10109',
        displayValue: 'Handyman',
      },                  
    ],
    validationRules: ['required'],
  },
  {
    id: 3,
    type: 'email',
    title: 'Email',
    description: 'What is your email address?',
    name: 'contactEmail',
    validationRules: ['required', 'pattern'],
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  },
  {
    id: 4,
    type: 'select',
    title: 'Annual Sales',
    description: 'What are the annual sales for your business?',
    name: 'grossAnnualSales',
    options: [
      {
        id: 1,
        value: 50_000,
        displayValue: '$50k',
      },
      {
        id: 2,
        value: 75_000,
        displayValue: '$75k',
      },
      {
        id: 3,
        value: 100_000,
        displayValue: '$100k',
      },      
      {
        id: 4,
        value: 150_000,
        displayValue: '$150k',
      },
      {
        id: 5,
        value: 200_000,
        displayValue: '$200k',
      },                  
    ],
    validationRules: ['required'],
  },
  {
    id: 5,
    type: 'select',
    title: 'Annual payroll',
    description: 'What is the annual payroll for your business?',
    name: 'annualPayroll',
    options: [
      {
        id: 1,
        value: 50_000,
        displayValue: '$50k',
      },
      {
        id: 2,
        value: 75_000,
        displayValue: '$75k',
      },
      {
        id: 3,
        value: 100_000,
        displayValue: '$100k',
      },      
      {
        id: 4,
        value: 150_000,
        displayValue: '$150k',
      },
      {
        id: 5,
        value: 200_000,
        displayValue: '$200k',
      },                  
    ],
    validationRules: ['required'],
  },
  {
    id: 6,
    type: 'number',
    title: 'Number of employees',
    description: 'How many employees does your business have?',
    name: 'numEmployees',
    validationRules: ['required'],
  },
  {
    id: 7,
    type: 'text',
    title: 'Zip Code',
    description: 'What is your zip code?',
    name: 'zip',
    validationRules: ['required', 'pattern'],
    pattern: /^\d{5}(-\d{4})?$/,
  },
];

export default formElements;
