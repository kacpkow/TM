import { createElement } from 'react';

export default ({
  className = '', as = 'td', children, ...rest
}) => createElement(
  as,
  {
    className: `table__column ${className}`,
    ...rest
  },
  children
);
