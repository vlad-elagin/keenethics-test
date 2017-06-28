/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import LoginPage from './LoginPage';

if (Meteor.isClient) {
  describe('Login Page', () => {
    it('should render', () => {
      // LoginPage uses withRouter bindings, so we need to provide router context
      const item = mount(<BrowserRouter><LoginPage /></BrowserRouter>);
      assert(item.hasClass('login-page'));
    });
    /*
    beforeEach(() => {
      // prepare user for logging
      Meteor.users.remove({});
      Accounts.createUser('John Smith', 'john@smith.com', 'password');
    });

    it('logs in', () => {
      const item = mount(<BrowserRouter><LoginPage /></BrowserRouter>);
      // fill login form
      item.find('input[name="username"]').simulate('change', { value: 'John Smith' });
      item.find('input[name="password"]').simulate('change', { value: 'password' });

    });
    */
  });
}
