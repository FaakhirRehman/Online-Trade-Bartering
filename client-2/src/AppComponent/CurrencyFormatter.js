import React from 'react';

function CurrencyFormatter({ amount }) {
  const formatter = new Intl.NumberFormat('ur-PK', {
    style: 'currency',
    currency: 'PKR',
  });
  const formattedAmount = formatter.format(amount);

  return <span>{formattedAmount}</span>;
}

export default CurrencyFormatter;
