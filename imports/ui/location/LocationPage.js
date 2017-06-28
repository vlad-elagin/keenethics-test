import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Button } from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Message from './Message';
import Messages from '../../api/messages';

class Location extends Component {

  constructor(props) {
    super(props);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    if (!Meteor.userId()) {
      this.props.history.push('/login');
    }
  }

  onMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  submitMessage(e) {
    e.preventDefault();
    if (this.state.message.length === 0) return;
    const user = Meteor.user();
    Messages.insert({
      author: user._id,
      location: user.profile.location,
      timestamp: new Date(),
      text: this.state.message,
    });
    this.setState({ message: '' });
  }

  render() {
    const messages = this.props.messages.map(message => (
      <Message message={message} key={message._id} />
    ));

    return (
      <div className="panel panel-default location-page">

        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 messages-wrapper">
            {messages}
          </div>
        </div>

        <div className="panel-footer row">
          <Form inline className="col-sx-12 col-sm-8 col-sm-offset-2" onSubmit={this.submitMessage}>
            <FormGroup controlId="formControlsTextarea">
              <Textarea
                className="message-input form-control"
                placeholder="Enter your message"
                minRows={1}
                maxRows={5}
                value={this.state.message}
                onChange={this.onMessageChange}
              />
              <Button bsStyle="primary" className="pull-right" type="submit">Send</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

Location.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    authorName: PropTypes.string,
    timestamp: PropTypes.number,
    text: PropTypes.string,
  }).isRequired).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default createContainer(() => {
  const user = Meteor.user();
  if (user) {
    return {
      messages: Messages
        .find(
        { location: user.profile.location },
        {
          sort: { timestamp: 1 },
          limit: 30,
          transform: (message) => {
            const author = Meteor.users.findOne(message.author);
            let authorName;
            if (author && author.emails) {
              authorName = author.username || author.emails[0].address;
            }
            return {
              ...message,
              authorName,
            };
          },
        },
        )
        .fetch(),
    };
  }
  return {
    messages: [],
  };
}, Location);
