import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'date-format-lite';
import { Meteor } from 'meteor/meteor';

const Message = ({ message }) => (
  <div
    className={classnames({
      'col-xs-12 col-sm-8': true,
      'col-sm-offset-4': message.author !== Meteor.userId(),
    })}
  >
    <h4>
      {message.authorName}
      <small className="pull-right">{message.timestamp.format('YYYY-MM-DD hh:mm:ss')}</small>
    </h4>
    <p className="well well-sm">{message.text}</p>
  </div>
);

Message.propTypes = {
  message: PropTypes.shape({
    author: PropTypes.string,
    authorName: PropTypes.string,
    timestamp: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
};

export default Message;
