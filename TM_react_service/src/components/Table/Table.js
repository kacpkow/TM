import React from 'react';

export default ({ className = '', ...rest }) => (
  <div className="table">
    <table className={`table__content ${className}`} {...rest} />
  </div>
);
