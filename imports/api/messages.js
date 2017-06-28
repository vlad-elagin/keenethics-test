import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', () => Messages.find());

  Meteor.methods({
    'messages.post'(author, location, text) {
      check(author, String);
      check(location, String);
      check(text, String);

      Messages.insert({
        author,
        location,
        timestamp: new Date(),
        text,
      });
    },
  });
}


export default Messages;
