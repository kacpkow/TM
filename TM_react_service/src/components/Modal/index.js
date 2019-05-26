import React from 'react';
import { useSpring, animated } from 'react-spring';
import Portal from '../Portal';
import Overlay from '../Overlay';
import { MODAL_SIZES } from '../../config/constants';

import './style.scss';

export default ({
  className = '',
  isOpen = false,
  size = MODAL_SIZES.medium,
  onClose,
  children,
  ...rest
}) => {
  const animation = useSpring(
    isOpen
      ? {
        opacity: 1,
        pointerEvents: 'auto',
        marginTop: 0
      }
      : {
        opacity: 0,
        pointerEvents: 'none',
        marginTop: -20
      }
  );

  return (
    <Portal>
      <Overlay isOpen={isOpen} onClick={onClose} />

      <animated.div style={animation} className={`modal modal--${size} ${className}`} {...rest}>
        <div className="modal__content">
          {children}

          {onClose && (
            <button type="button" className="modal__close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
      </animated.div>
    </Portal>
  );
};
