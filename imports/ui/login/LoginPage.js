import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.afterSubmitHandler = this.afterSubmitHandler.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: null,
    };
  }

  componentDidMount() {
    if (Meteor.userId()) {
      this.props.history.push('/profile');
    }
  }

  onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    if (e) e.preventDefault();
    Meteor.loginWithPassword(
      this.state.email,
      this.state.password,
      this.afterSubmitHandler,
    );
  }

  onSignUp() {
    Meteor.call('user.create',
      this.state.username,
      this.state.email,
      this.state.password,
    );

    this.onSubmit();
  }

  afterSubmitHandler(error) {
    if (error) {
      this.setState({ error: error.reason });
    } else {
      this.props.history.push('/profile');
    }
  }

  render() {
    return (
      <div className="panel panel-default row login-page">

        <div className="col-sx-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <h1>Welcome!</h1>
          <form onSubmit={this.onSubmit}>

            <FormGroup
              controlId="emailInput"
            >
              <ControlLabel>Enter your email address</ControlLabel>
              <FormControl
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="passwordInput"
            >
              <ControlLabel>Enter your password:</ControlLabel>
              <FormControl
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            { this.state.error &&
              <HelpBlock>{this.state.error}</HelpBlock>
            }

            <Button type="submit" bsStyle="primary">Log In</Button>
            or
            <FormGroup
              controlId="usernameInput"
            >
              <ControlLabel>Add your name</ControlLabel>
              <FormControl
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            and
            <Button onClick={this.onSignUp}>Sign Up</Button>
            with same credentials.

          </form>
        </div>

      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginPage);
