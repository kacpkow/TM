import React from 'react';

import './style.scss';

export default ({ className = '', ...rest }) => <div className={`box ${className}`} {...rest} />;
