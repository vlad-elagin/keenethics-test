/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import ProfilePage from './ProfilePage';

if (Meteor.isClient) {
  describe('Profile Page', () => {
    it('should render', () => {
      // LoginPage uses withRouter bindings, so we need to provide router context
      const item = mount(<BrowserRouter><ProfilePage /></BrowserRouter>);
      assert(item.hasClass('profile-page'));
    });
  });
}
