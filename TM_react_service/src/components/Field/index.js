import React from 'react';
import nanoid from 'nanoid';
import Input from '../Input';

import './style.scss';

const Field = ({ label, error, ...rest }) => {
  const id = nanoid();

  return (
    <label className="field" htmlFor={id}>
      {label && <span className="field__text">{label}</span>}

      <Input id={id} {...rest} />

      {error && <span className="field__error">{error}</span>}
    </label>
  );
};

export default Field;
