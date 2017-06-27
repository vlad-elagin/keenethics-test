import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.users.allow({
    update: userId => (userId === Meteor.userId()),
  });
});
