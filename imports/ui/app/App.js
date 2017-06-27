import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../header/Header';
import LoginPage from '../login/LoginPage';
import ProfilePage from '../profile/ProfilePage';
import LocationPage from '../location/LocationPage';

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
        <Route path="/profile" component={ProfilePage} />
        <Route path="/location" component={LocationPage} />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
