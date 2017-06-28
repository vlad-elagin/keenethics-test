/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

if (Meteor.isClient) {
  describe('Header', () => {
    it('should render', () => {
      const item = mount(<BrowserRouter><Header /></BrowserRouter>);
      assert.equal(item.find('h1').node.innerText, 'keen.ethics test');
    });
  });
}
