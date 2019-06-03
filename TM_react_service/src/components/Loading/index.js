import React from 'react';
import { useTransition, animated } from 'react-spring';

import './style.scss';

const Loading = ({ isActive = false, children, ...rest }) => {
  const transitions = useTransition(isActive, null, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(({ item, key, props }) => (
    <div key={key} style={{ position: 'relative' }} {...rest}>
      {item ? (
        <animated.div style={props} className="loading" />
      ) : (
        <animated.div style={{ ...props, width: '100%' }}>{children}</animated.div>
      )}
    </div>
  ));
};

export default Loading;
