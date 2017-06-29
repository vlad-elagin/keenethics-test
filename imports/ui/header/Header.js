import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const Header = ({ user, history }) => (
  <header className="row">
    <h1 className="col-xs-12 col-md-6">keen<span>.</span>ethics test</h1>
    {
      user.username &&
        <div className="col-xs-12 col-md-6 text-right">
          {
            user.location &&
            <Link to="/location">Location Chat</Link>
          }
          <Link to="/profile">{user.username} Profile</Link>
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
    }

  </header>
);

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    location: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Header.defaultProps = {
  user: {
    username: null,
    location: false,
  },
};

export default createContainer(() => {
  const user = Meteor.user();
  if (user) {
    return {
      user: {
        username: user.username,
        location: !!user.profile.location,
      },
    };
  }
  return {
    user: {
      username: null,
      location: false,
    },
  };
}, withRouter(Header));
