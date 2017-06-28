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
  });
}

