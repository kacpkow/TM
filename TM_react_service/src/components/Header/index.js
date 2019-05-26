import React from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import SettingsContext from '../../contexts/Settings';
import UserContext from '../../contexts/User';
import Wrapper from '../Wrapper';
import Nav from '../Nav';

import './style.scss';

export default () => {
  const { user } = UserContext();
  const { getSetting } = SettingsContext();

  return (
    <div className="header">
      <Wrapper className="header__content">
        <Nav />

        <div className="header__title">{getSetting('title')}</div>

        {user && (
          <div className="header__user">
            <Link to="/konto">
              {user.username} <Icon.User size={18} />
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
