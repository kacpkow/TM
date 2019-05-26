import { createElement } from 'react';

import './style.scss';

const Input = ({
  className = '', as = 'input', type = 'text', children, ...rest
}) => createElement(
  as,
  {
    className: `input ${className}`,
    type,
    ...rest
  },
  children
);

export default Input;
