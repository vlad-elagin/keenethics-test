/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';

import Messages from './messages.js';

if (Meteor.isServer) {
  describe('Messages', () => {
    beforeEach(() => {
      // drop messages db
      Messages.remove({});
    });

    it('can post new messages', () => {
      // insert message into collection
      const postMessage = Meteor.server.method_handlers['messages.post'];
      const authorId = Random.id();
      postMessage(authorId, 'loc1', 'Lorem ipsum dolor sit amet.');
      // get collection
      const messages = Messages.find().fetch();
      // should add one message
      assert.equal(messages.length, 1);
      // with specified credentials
      assert.equal(messages[0].author, authorId);
      assert.equal(messages[0].location, 'loc1');
      assert.equal(messages[0].text, 'Lorem ipsum dolor sit amet.');
    });
  });
}

