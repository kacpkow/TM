import React from 'react';
import { useSpring, animated } from 'react-spring';

import './style.scss';

const Overlay = ({ isOpen = false, ...rest }) => {
  const style = useSpring(
    isOpen
      ? {
        opacity: 1,
        pointerEvents: 'auto'
      }
      : {
        opacity: 0,
        pointerEvents: 'none'
      }
  );

  return <animated.div className="overlay" style={style} {...rest} />;
};

export default Overlay;
