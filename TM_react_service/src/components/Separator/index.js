import React from 'react';

import './style.scss';

export default ({ className = '', ...rest }) => (
  <hr className={`separator ${className}`} {...rest} />
);
