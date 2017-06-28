import { Meteor } from 'meteor/meteor';
import '../imports/api/users';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.allow({
    update: userId => (userId === Meteor.userId()),
  });
});
