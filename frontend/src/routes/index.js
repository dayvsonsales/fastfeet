import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ToastContainer } from 'react-toastify';
import Route from './Route';

import history from '~/services/history';
import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Problem from '~/pages/Problem';
import Recipient from '~/pages/Recipient';

import GlobalStyle from '~/styles/global';

import 'react-toastify/dist/ReactToastify.css';

import { store, persistor } from '~/store';

import DeliveryForm from '~/pages/Delivery/Form';
import DeliverymanForm from '~/pages/Deliveryman/Form';
import RecipientForm from '~/pages/Recipient/Form';

export default function Routes() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={SignIn} />

            <Route exact path="/delivery" component={Delivery} isPrivate />
            <Route
              exact
              path="/delivery/create"
              component={DeliveryForm}
              isPrivate
            />
            <Route
              exact
              path="/delivery/edit/:id"
              component={DeliveryForm}
              isPrivate
            />
            <Route
              exact
              path="/deliveryman"
              component={Deliveryman}
              isPrivate
            />
            <Route
              exact
              path="/deliveryman/edit/:id"
              component={DeliverymanForm}
              isPrivate
            />
            <Route
              exact
              path="/deliveryman/create"
              component={DeliverymanForm}
              isPrivate
            />
            <Route exact path="/recipient" component={Recipient} isPrivate />
            <Route
              exact
              path="/recipient/create"
              component={RecipientForm}
              isPrivate
            />
            <Route
              exact
              path="/recipient/edit/:id"
              component={RecipientForm}
              isPrivate
            />
            <Route path="/problem" component={Problem} isPrivate />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}
