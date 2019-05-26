import React from 'react';
import { useTransition, animated } from 'react-spring';
import AlertContext from '../../contexts/Alert';
import Portal from '../Portal';
import Alert from '../Alert';

import './style.scss';

export default () => {
  const { items, removeAlert } = AlertContext();

  const transitions = useTransition(items, item => item.id, {
    from: {
      opacity: 0,
      maxHeight: '0vh',
      overflow: 'hidden'
    },
    enter: {
      opacity: 1,
      maxHeight: '100vh'
    },
    leave: {
      opacity: 0,
      maxHeight: '0vh'
    }
  });

  return (
    <Portal>
      <div className="notifications">
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Alert onClose={() => removeAlert(item.id)} {...item} />
          </animated.div>
        ))}
      </div>
    </Portal>
  );
};
