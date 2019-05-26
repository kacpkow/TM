import React from 'react';

import './style.scss';

export default ({ className = '', ...rest }) => (
  <div className={`wrapper ${className}`} {...rest} />
);
