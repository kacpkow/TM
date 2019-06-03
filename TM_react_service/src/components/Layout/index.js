import React from 'react';
import Header from '../Header';
import Wrapper from '../Wrapper';
import Notifications from '../Notifications';

import './style.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    <Notifications />

    <Wrapper>
      <main className="main">{children}</main>
    </Wrapper>
  </>
);

export default Layout;
