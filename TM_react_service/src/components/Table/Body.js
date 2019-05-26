import React from 'react';

export default ({ className = '', ...rest }) => (
  <tbody className={`table__body ${className}`} {...rest} />
);
