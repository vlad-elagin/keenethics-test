/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import './users.js';

if (Meteor.isServer) {
  describe('Users', () => {
    beforeEach(() => {
      Meteor.users.remove({});
      const userCreate = Meteor.server.method_handlers['user.create'];
      userCreate('John Smith', 'john@smith.com', 'password');
    });

    it('can create new users', () => {
      const user = Meteor.users.find().fetch()[0];
      assert.equal(user.username, 'John Smith');
      assert.equal(user.emails[0].address, 'john@smith.com');
      assert.deepEqual(user.profile, { location: null });
    });

    it('can update username of current user', () => {
      const newUserId = Meteor.users.find().fetch()[0]._id;
      const userUpdate = Meteor.server.method_handlers['user.changeUsername'];
      userUpdate(newUserId, 'John Doe');
      // compare
      const user = Meteor.users.find().fetch()[0];
      assert.equal(user.username, 'John Doe');
    });

    it('can update location of current user', () => {
      const newUserId = Meteor.users.find().fetch()[0]._id;
      const userUpdate = Meteor.server.method_handlers['user.changeLocation'];
      userUpdate(newUserId, 'loc1');
      // compare
      const user = Meteor.users.find().fetch()[0];
      assert.deepEqual(user.profile, { location: 'loc1' });
    });

    it('can update email of current user', () => {
      const newUserId = Meteor.users.find().fetch()[0]._id;
      const userChangeEmail = Meteor.server.method_handlers['user.changeEmail'];
      userChangeEmail(newUserId, 'john@doe.com');
      // compare
      const user = Meteor.users.find().fetch()[0];
      assert.equal(user.emails[0].address, 'john@doe.com');
    });
  });
}

