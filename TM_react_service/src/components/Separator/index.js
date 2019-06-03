import React from 'react';

import './style.scss';

const Separator = ({ className = '', ...rest }) => (
  <hr className={`separator ${className}`} {...rest} />
);

export default Separator;
