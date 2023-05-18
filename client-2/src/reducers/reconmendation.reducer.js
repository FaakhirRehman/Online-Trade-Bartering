const ReconmReducer = (state = [], action) => {
  switch (action.type) {
    case 'PRODUCT_RECONMENDATION':
      // Send a POST request with the JSON payload
      fetch('/api/reconmendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(action.payload),
      })
        .then((response) => {
          state = response;
          return state;
        })
        .catch((error) => {
          return state;
        });
      return state;

    default:
      return state;
  }
};

export default ReconmReducer;
