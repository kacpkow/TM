import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import Portal from '../Portal';
import Overlay from '../Overlay';
import { MODAL_SIZES } from '../../config/constants';

import './style.scss';

const Modal = ({
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
        config: config.gentle,
        transform: 'translate(-50%, -50%) translateX(0px) scale(1)'
      }
      : {
        opacity: 0,
        pointerEvents: 'none',
        config: config.gentle,
        transform: 'translate(-50%, -50%) translateY(-20px) scale(1.05)'
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

export default Modal;
