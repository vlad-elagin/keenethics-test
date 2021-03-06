/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import LoginPage from './LoginPage';

if (Meteor.isClient) {
  describe('Login Page', () => {
    it('should render', () => {
      // LoginPage uses withRouter bindings, so we need to provide router context
      const item = mount(<BrowserRouter><LoginPage /></BrowserRouter>);
      assert(item.hasClass('login-page'));
    });
  });
}
