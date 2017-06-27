import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

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

  /*
  'user.updateProfile'(username, location) {
    check(username, String);
    check(location, String);


  }
  */
});
