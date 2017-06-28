import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
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

    'user.update'(userId, username, location) {
      check(userId, String);
      check(username, String);
      check(location, String);

      const user = Meteor.users.findOne({ _id: userId });
      if (!user) return;
      Meteor.users.update(userId, { $set: {
        username: username || user.username,
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
