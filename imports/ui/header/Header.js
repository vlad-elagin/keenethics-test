import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const Header = ({ username, history }) => (
  <header className="row">

    <h1 className="col-xs-6 col-sm-4">keen<span>.</span>ethics test</h1>
    {
      username !== null ?
        <div className="pull-right">
          <Link to="/location">Location Chat</Link>
          <Link to="/profile">{username} Profile</Link>
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              Meteor.logout((err) => {
                if (!err) history.push('/login');
              });
            }}
          >Logout</a>
        </div>
      :
        <div className="pull-right">
          <Link to="/login" />
        </div>
    }

  </header>
);

Header.propTypes = {
  username: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default createContainer(() => {
  const user = Meteor.user();
  if (user && user.emails) {
    return {
      username: user.username || user.emails[0].address,
    };
  }
  return {
    username: '',
  };
}, withRouter(Header));
