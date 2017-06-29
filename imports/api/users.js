import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.publish('users', () => Meteor.users.find());

  Meteor.methods({
    'user.create'(username, email, password) {
      check(email, String);
      check(password, String);
      check(username, String);

      Accounts.createUser({
        username,
        email,
        password,
        profile: {
          location: null,
        },
      });
    },

    'user.changeUsername'(userId, username) {
      check(userId, String);
      check(username, String);

      const user = Meteor.users.findOne({ _id: userId });
      if (!user) return;
      Meteor.users.update(userId, { $set: {
        username: username || user.username,
      } });
    },

    'user.changeLocation'(userId, location) {
      check(userId, String);
      check(location, String);

      const user = Meteor.users.findOne({ _id: userId });
      if (!user) return;
      Meteor.users.update(userId, { $set: {
        profile: {
          location: location || user.profile.location,
        },
      } });
    },

    'user.changeEmail'(userId, email) {
      check(userId, String);
      check(email, String);

      const user = Meteor.users.findOne({ _id: userId });
      if (!user) return;
      Meteor.users.update(userId, { $set: {
        'emails.0.address': email,
      } });
    },
  });
}
