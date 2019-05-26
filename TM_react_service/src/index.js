import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider as UserProvider } from './contexts/User';
import { Provider as AlertProvider } from './contexts/Alert';
import { Provider as SettingsProvider } from './contexts/Settings';
import Layout from './components/Layout';
import Route from './components/Route';

import 'normalize.css';
import './style.scss';

import Main from './views/Main';
import Account from './views/Account';
import Activation from './views/Activation';
import Editor from './views/Editor';
import Upload from './views/Upload';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import SignOut from './views/SignOut';
import NotFound from './views/NotFound';

const App = () => (
  <UserProvider>
    <AlertProvider>
      <SettingsProvider>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={Main} authorized />
              <Route path="/konto" component={Account} authorized />
              <Route path="/aktywuj" component={Activation} authorized />
              <Route path="/edytor" exact component={Editor} authorized />
              <Route path="/edytor/:id" component={Editor} authorized />
              <Route path="/upload" component={Upload} authorized />
              <Route path="/zaloguj" component={SignIn} unauthorized />
              <Route path="/zarejestruj" component={SignUp} unauthorized />
              <Route path="/wyloguj" component={SignOut} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </SettingsProvider>
    </AlertProvider>
  </UserProvider>
);

render(<App />, document.getElementById('root'));

serviceWorker.register();
