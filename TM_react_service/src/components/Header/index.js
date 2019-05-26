import React from 'react';
import SettingsContext from '../../contexts/Settings';
import Wrapper from '../Wrapper';
import Nav from '../Nav';

import './style.scss';

export default () => {
  const { getSetting } = SettingsContext();

  return (
    <div className="header">
      <Wrapper className="header__content">
        <Nav />

        <div className="header__title">{getSetting('title')}</div>
      </Wrapper>
    </div>
  );
};
