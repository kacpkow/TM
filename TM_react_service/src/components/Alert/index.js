import React from 'react';
import { ALERT_VARIANTS } from '../../config/constants';

import './style.scss';

const Alert = ({ variant = ALERT_VARIANTS.primary, children, onClose }) => (
  <div className={`alert alert--${variant}`}>
    <div className="alert__content">{children}</div>

    {onClose && (
      <button type="button" className="alert__close" onClick={onClose}>
        &times;
      </button>
    )}
  </div>
);

export default Alert;
