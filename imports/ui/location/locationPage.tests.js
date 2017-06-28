/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Location from './LocationPage';

if (Meteor.isClient) {
  describe('Location Page', () => {
    it('should render', () => {
      const item = mount(<BrowserRouter><Location /></BrowserRouter>);
      assert(item.hasClass('location-page'));
    });
  });
}
