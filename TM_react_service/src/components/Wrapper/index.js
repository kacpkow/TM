import React from 'react';

import './style.scss';

const Wrapper = ({ className = '', ...rest }) => (
  <div className={`wrapper ${className}`} {...rest} />
);

export default Wrapper;
