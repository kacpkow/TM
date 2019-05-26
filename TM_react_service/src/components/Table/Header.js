import React from 'react';

export default ({ className = '', ...rest }) => (
  <thead className={`table__head ${className}`} {...rest} />
);
