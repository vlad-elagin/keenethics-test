import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.validateState = this.validateState.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.state = {
      email: '',
      emailState: null,
      password: '',
      passwordState: null,
      error: null,
    };
  }

  componentDidMount() {
    if (Meteor.userId()) {
      this.props.history.push('/profile');
    }
  }

  onInputChange(e) {
    this.setState({ [e.target.type]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.validateState(() => {
      Meteor.loginWithPassword(
        this.state.email,
        this.state.password,
        this.errorHandler,
      );
    });
  }

  onSignUp() {
    this.validateState(() => {
      Accounts.createUser({
        username: '',
        email: this.state.email,
        password: this.state.password,
      }, this.errorHandler);
    });
  }

  errorHandler(error) {
    if (error) {
      this.setState({ error: error.reason });
    } else {
      this.props.history.push('/profile');
    }
  }

  validateState(cb) {
    const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.state.email.length > 3 && regexp.test(this.state.email)) {
      this.setState({ emailState: 'success' });
    } else {
      this.setState({ emailState: 'error' });
    }

    if (this.state.password.length > 3) {
      this.setState({ passwordState: 'success' });
    } else {
      this.setState({ passwordState: 'error' });
    }
    if (cb) cb();
  }

  render() {
    return (
      <div className="panel panel-default row login-page">

        <div className="col-sx-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <h1>Welcome!</h1>
          <form onSubmit={this.onSubmit}>
            <FormGroup
              controlId="emailInput"
              validationState={this.state.emailState}
            >
              <ControlLabel>Enter your email address</ControlLabel>
              <FormControl
                type="email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              controlId="passwordInput"
              validationState={this.state.passwordState}
            >
              <ControlLabel>Enter your password:</ControlLabel>
              <FormControl
                type="password"
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
            <Button onClick={this.onSignUp}>Sign Up</Button>

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
