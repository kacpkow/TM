import React from 'react';
import { useTransition, animated } from 'react-spring';

import './style.scss';

export default ({ isActive = false, children, ...rest }) => {
  const transitions = useTransition(isActive, null, {
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(({ item, key, props }) => (
    <div key={key} {...rest}>
      {item ? (
        <animated.div style={props} className="loading" />
      ) : (
        <animated.div style={props}>{children}</animated.div>
      )}
    </div>
  ));
};
