/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import './users.js';

if (Meteor.isServer) {
  describe('Users', () => {
    beforeEach(() => {
      Meteor.users.remove({});
    });

    it('can create new users', () => {
      const userCreate = Meteor.server.method_handlers['user.create'];
      userCreate('John Smith', 'john@smith.com', 'password');
      const user = Meteor.users.find().fetch()[0];
      assert.equal(user.username, 'John Smith');
      assert.equal(user.emails[0].address, 'john@smith.com');
      assert.deepEqual(user.profile, { location: null });
    });

    it('can update profile of current user', () => {
      // create user
      const userCreate = Meteor.server.method_handlers['user.create'];
      // update user
      userCreate('John Smith', 'john@smith.com', 'password');
      const newUserId = Meteor.users.find().fetch()[0]._id;
      const userUpdate = Meteor.server.method_handlers['user.update'];
      userUpdate(newUserId, 'John Doe', 'loc1');
      // compare
      const user = Meteor.users.find().fetch()[0];
      assert.equal(user.username, 'John Doe');
      assert.deepEqual(user.profile, { location: 'loc1' });
    });

    it('can update email of current user', () => {
      // create user
      const userCreate = Meteor.server.method_handlers['user.create'];
      // update user
      userCreate('John Smith', 'john@smith.com', 'password');
      const newUserId = Meteor.users.find().fetch()[0]._id;
      const userChangeEmail = Meteor.server.method_handlers['user.changeEmail'];
      userChangeEmail(newUserId, 'john@doe.com');
      // compare
      const user = Meteor.users.find().fetch()[0];
      assert.equal(user.emails[0].address, 'john@doe.com');
    });
  });
}

