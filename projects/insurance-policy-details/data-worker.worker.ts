addEventListener('message', ({ data }) => {
  if (data.action === 'fetchData') {
    setTimeout(() => {
      postMessage({
        result: [
          { name: 'Health Insurance', type: 'Medical', status: 'Active', policyAmount: 500, term: 3 },
          { name: 'Car Insurance', type: 'Vehicle', status: 'Expired', policyAmount: 250, term: 2 },
          { name: 'Home Insurance', type: 'Property', status: 'Active', policyAmount: 370, term: 5 },
        ],
      });
    }, 2000);
  }

  if (data.action === 'fetchPolicyDetails') {
    const policyName = data.payload;
    let result;

    switch (policyName) {
      case 'Health Insurance':
        result = {
          policyNumber: 'INS12345678',
          issueDate: '2021-05-15',
          insuredValue: 500000,
          statusDetails: 'Fully covered, renewal due in 2024.',
          additionalNotes: 'The policy includes flood damage protection.'
        };
        break;
      case 'Car Insurance':
        result = {
          policyNumber: 'CAR98765432',
          issueDate: '2022-06-18',
          insuredValue: 30000,
          statusDetails: 'Expired, renewal pending.',
          additionalNotes: 'The policy includes theft coverage.'
        };
        break;
      case 'Home Insurance':
        result = {
          policyNumber: 'HOME87654321',
          issueDate: '2020-04-10',
          insuredValue: 150000,
          statusDetails: 'Active, renewal due in 2025.',
          additionalNotes: 'The policy includes earthquake protection.'
        };
        break;
      default:
        result = {};
        break;
    }

    setTimeout(() => {
      postMessage({
        result,
      });
    }, 2000);
  }
});
