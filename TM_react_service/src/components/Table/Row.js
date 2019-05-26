import React from 'react';

export default ({ className = '', ...rest }) => (
  <tr className={`table__row ${className}`} {...rest} />
);
