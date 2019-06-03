import React from 'react';
import { Link } from '@reach/router';
import * as Icon from 'react-feather';
import { ICON_SIZE } from '../../config/constants';
import { useSetting } from '../../contexts/Setting';
import { useUser } from '../../contexts/User';
import Wrapper from '../Wrapper';
import Nav from '../Nav';

import './style.scss';

const Header = () => {
  const { user } = useUser();
  const { getSetting } = useSetting();

  return (
    <div className="header">
      <Wrapper className="header__content">
        <Nav />

        {user && (
          <Link to="/" className="header__home">
            <Icon.Home size={ICON_SIZE.medium} />
          </Link>
        )}

        <div className="header__title">{getSetting('title')}</div>

        {user && (
          <div className="header__user">
            <Link to="/konto">
              {user.username} <Icon.User size={ICON_SIZE.medium} />
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Header;
