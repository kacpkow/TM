import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useAlert } from '../../contexts/Alert';
import Portal from '../Portal';
import Alert from '../Alert';

import './style.scss';

const Notifications = () => {
  const { items, deleteAlert } = useAlert();

  const transitions = useTransition(items, item => item.id, {
    from: {
      opacity: 0,
      maxHeight: '0vh',
      overflow: 'hidden',
      transform: 'translateX(20px) scale(0.8)'
    },
    enter: {
      opacity: 1,
      maxHeight: '100vh',
      transform: 'translateX(0)  scale(1)'
    },
    leave: {
      opacity: 0,
      maxHeight: '0vh',
      transform: 'translateX(20px) scale(0.8)'
    }
  });

  return (
    <Portal>
      <div className="notifications">
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Alert onClose={() => deleteAlert(item.id)} {...item} />
          </animated.div>
        ))}
      </div>
    </Portal>
  );
};

export default Notifications;
