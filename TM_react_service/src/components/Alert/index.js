import React from 'react';
import { ALERT_VARIANTS } from '../../config/constants';

import './style.scss';

export default ({
  className = '',
  variant = ALERT_VARIANTS.primary,
  children,
  onClose,
  ...rest
}) => (
  <div className={`alert alert--${variant} ${className}`} {...rest}>
    <div className="alert__content">{children}</div>

    {onClose && (
      <button type="button" className="alert__close" onClick={onClose}>
        &times;
      </button>
    )}
  </div>
);
