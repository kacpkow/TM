import { createElement } from 'react';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../config/constants';

import './style.scss';

const Button = ({
  className = '',
  as = 'button',
  type = 'button',
  variant = BUTTON_VARIANTS.primary,
  size = BUTTON_SIZES.medium,
  isLoading = false,
  isActive = false,
  children,
  ...rest
}) => createElement(
  as,
  {
    className: `btn btn--${variant} btn--${size} ${isActive ? 'btn--active' : ''} ${
      isLoading ? 'btn--loading' : ''
    } ${className}`,
    type: as === 'button' ? type : undefined,
    ...rest
  },
  children
);

export default Button;
