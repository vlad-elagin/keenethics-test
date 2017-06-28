import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import validate from '../../helpers/validator';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      username: '',
      usernameError: null,
      email: '',
      emailError: null,
      password: '',
      passwordError: null,
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
      (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.props.history.push('/profile');
        }
      },
    );
  }

  onSignUp() {
    this.validate(() => {
      if (this.state.usernameError || this.state.emailError || this.state.passwordError) return;
      Meteor.call('user.create',
        this.state.username,
        this.state.email,
        this.state.password,
        (err) => {
          if (err) {
            this.setState({ error: err.reason });
          } else {
            this.onSubmit();
          }
        },
      );
    });
  }

  validate(cb) {
    this.setState({
      emailError: validate('email', this.state.email),
      passwordError: validate('password', this.state.password),
      usernameError: validate('username', this.state.username),
    }, cb);
  }

  render() {
    return (
      <div className="panel panel-default row login-page">

        <div className="col-sx-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <h1>Welcome!</h1>
          <form onSubmit={this.onSubmit} noValidate>

            <FormGroup
              controlId="emailInput"
              validationState={this.state.emailError ? 'error' : null}
            >
              <ControlLabel>Enter your email address</ControlLabel>
              <FormControl
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
              {this.state.emailError && <HelpBlock>{this.state.emailError}</HelpBlock>}
            </FormGroup>

            <FormGroup
              controlId="passwordInput"
              validationState={this.state.passwordError ? 'error' : null}
            >
              <ControlLabel>Enter your password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
              />
              {this.state.passwordError && <HelpBlock>{this.state.passwordError}</HelpBlock>}
            </FormGroup>

            { this.state.error &&
              <HelpBlock>{this.state.error}</HelpBlock>
            }

            <Button type="submit" bsStyle="primary">Log In</Button>
            or
            <FormGroup
              controlId="usernameInput"
              validationState={this.state.usernameError ? 'error' : null}
            >
              <ControlLabel>Add your name</ControlLabel>
              <FormControl
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onInputChange}
              />
              {this.state.usernameError && <HelpBlock>{this.state.usernameError}</HelpBlock>}
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
