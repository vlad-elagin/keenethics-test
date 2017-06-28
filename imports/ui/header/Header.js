import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const Header = ({ username, history }) => (
  <header className="row">

    <h1 className="col-xs-12 col-md-6">keen<span>.</span>ethics test</h1>
    {
      username &&
        <div className="col-xs-12 col-md-6 text-right">
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
    }

  </header>
);

Header.propTypes = {
  username: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Header.defaultProps = {
  username: null,
};

export default createContainer(() => {
  const user = Meteor.user();
  if (user) {
    return {
      username: user.username,
    };
  }
  return {
    username: null,
  };
}, withRouter(Header));
