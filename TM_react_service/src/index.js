import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import * as serviceWorker from './serviceWorker';
import Providers from './Providers';
import { Layout, Route } from './components';

import Main from './screens/Main';
import Account from './screens/Account';
import Activation from './screens/Activation';
import Editor from './screens/Editor';
import Tablets from './screens/Tablets';
import UpsertTablet from './screens/UpsertTablet';
import Upload from './screens/Upload';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SignOut from './screens/SignOut';
import NotFound from './screens/NotFound';

import 'normalize.css';
import './assets/scss/style.scss';

const App = () => (
  <Providers>
    <Layout>
      <Router>
        <Route path="/" component={Main} authorized />
        <Route path="/konto" component={Account} authorized />
        <Route path="/konto/:id" component={Account} authorized />
        <Route path="/aktywacja" component={Activation} authorized />
        <Route path="/edytor" component={Editor} authorized />
        <Route path="/edytor/:id" component={Editor} authorized />
        <Route path="/tablety" component={Tablets} authorized />
        <Route path="/tablety/dodaj" component={UpsertTablet} authorized />
        <Route path="/tablety/:id" component={UpsertTablet} authorized />
        <Route path="/pliki" component={Upload} authorized />
        <Route path="/zaloguj" component={SignIn} unauthorized />
        <Route path="/zarejestruj" component={SignUp} unauthorized />
        <SignOut path="/wyloguj" />
        <NotFound default />
      </Router>
    </Layout>
  </Providers>
);

render(<App />, document.getElementById('root'));

serviceWorker.register();
