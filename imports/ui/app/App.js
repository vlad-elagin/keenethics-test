import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../header/Header';
import LoginPage from '../login/LoginPage';

const App = () => (
  <BrowserRouter>
    <div className="root">
      <Header />
      <div className="container">
        <Route
          path="/"
          exact
          render={() => {
            if (!Meteor.userId()) {
              return (<Redirect to="/login" />);
            }
            return (<Redirect to="/profile" />);
          }}
        />
        <Route path="/login" component={LoginPage} />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
