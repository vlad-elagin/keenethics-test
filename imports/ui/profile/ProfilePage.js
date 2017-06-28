import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Form, Col, FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import validate from '../../helpers/validator';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.clearForm = this.clearForm.bind(this);
    this.onFormFieldUpdate = this.onFormFieldUpdate.bind(this);
    this.onLocationSubmit = this.onLocationSubmit.bind(this);
    this.onProfileSubmit = this.onProfileSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.onEmailSubmit = this.onEmailSubmit.bind(this);
    this.validate = this.validate.bind(this);
    const user = Meteor.user();
    this.state = {
      username: '',
      usernameError: null,
      location: user ? user.profile.location : '',
      locationError: null,

      password: '',
      passwordError: null,
      oldPassword: '',
      oldPasswordError: null,

      email: '',
      emailError: null,
    };
  }

  componentDidMount() {
    if (!Meteor.userId()) {
      this.props.history.push('/login');
    }
  }

  onFormFieldUpdate(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onLocationSubmit(e) {
    e.preventDefault();
    this.validate('location', () => {
      const userId = Meteor.userId();
      if (!this.state.locationError) {
        Meteor.call('user.changeLocation',
          userId,
          this.state.location,
        );
      }
    });
  }

  onProfileSubmit(e) {
    e.preventDefault();
    this.validate('profile', () => {
      const userId = Meteor.userId();
      if (!this.state.usernameError) {
        Meteor.call('user.changeUsername',
          userId,
          this.state.username,
          (err) => {
            if (!err) this.clearForm('profile');
          },
        );
      }
    });
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    this.validate('password', () => {
      if (!this.state.passwordError && !this.state.oldPasswordError) {
        if (this.state.password === this.state.oldPassword) {
          this.setState({ passwordError: 'Passwords are the same' });
          return;
        }
        Accounts.changePassword(this.state.oldPassword, this.state.password, (err) => {
          if (err) {
            if (err.error === 403) this.setState({ oldPasswordError: err.reason });
          } else {
            this.clearForm('password');
          }
        });
      }
    });
  }

  onEmailSubmit(e) {
    e.preventDefault();
    this.validate('email', () => {
      if (this.state.emailError) return;
      const userId = Meteor.userId();

      Meteor.call('user.changeEmail',
        userId,
        this.state.email,
        (err) => {
          if (err) {
            this.setState({ emailError: err.reason });
          } else {
            this.clearForm('email');
          }
        },
      );
    });
  }

  clearForm(form) {
    switch (form) {

      case 'profile':
        this.setState({
          username: '',
          location: '',
        });
        break;

      case 'password':
        this.setState({
          password: '',
          oldPassword: '',
        });
        break;

      case 'email':
        this.setState({
          email: '',
        });
        break;

      default:
        break;
    }
  }

  validate(form, cb) {
    switch (form) {

      case 'location':
        this.setState({
          locationError: validate('location', this.state.location),
        }, cb);
        break;

      case 'profile':
        this.setState({
          usernameError: validate('username', this.state.username),
        }, cb);
        break;

      case 'password':
        this.setState({
          passwordError: validate('password', this.state.password),
          oldPasswordError: validate('password', this.state.oldPassword),
        }, cb);
        break;

      case 'email':
        this.setState({
          emailError: validate('email', this.state.email),
        }, cb);
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="panel panel-default row profile-page">

        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <Form horizontal onSubmit={this.onLocationSubmit}>

            <FormGroup
              controlId="location"
              validationState={this.state.locationError ? 'error' : null}
            >
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                Location:
              </Col>
              <Col xs={8} sm={8}>
                <select
                  name="location"
                  className="form-control"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.location}
                >
                  <option value="" disabled>Select Your Location</option>
                  <option value="loc1">Location 1</option>
                  <option value="loc2">Location 2</option>
                </select>
                {this.state.locationError && <HelpBlock>{this.state.locationError}</HelpBlock>}
              </Col>
            </FormGroup>

            <div className="pull-right buttons">
              <Button bsStyle="primary" type="submit">Change location</Button>
            </div>

          </Form>

          <Form horizontal onSubmit={this.onProfileSubmit}>

            <FormGroup
              controlId="name"
              validationState={this.state.usernameError ? 'error' : null}
            >
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                Name:
              </Col>
              <Col xs={8} sm={8}>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Your new name"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.username}
                />
                {this.state.usernameError && <HelpBlock>{this.state.usernameError}</HelpBlock>}
              </Col>
            </FormGroup>

            <div className="pull-right buttons">
              <Button bsStyle="primary" type="submit">Change username</Button>
            </div>

          </Form>

          <Form horizontal onSubmit={this.onPasswordSubmit}>
            <FormGroup
              controlId="oldpassword"
              validationState={this.state.oldPasswordError ? 'error' : null}
            >
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                Current Password:
              </Col>
              <Col xs={8} sm={8}>
                <FormControl
                  type="password"
                  name="oldPassword"
                  placeholder="Current password"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.oldPassword}
                />
                {this.state.oldPasswordError &&
                  <HelpBlock>{this.state.oldPasswordError}</HelpBlock>
                }
              </Col>
            </FormGroup>

            <FormGroup
              controlId="password"
              validationState={this.state.passwordError ? 'error' : null}
            >
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                New Password:
              </Col>
              <Col xs={8} sm={8}>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="New Password"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.password}
                />
                {this.state.passwordError && <HelpBlock>{this.state.passwordError}</HelpBlock>}
              </Col>
            </FormGroup>

            <div className="pull-right buttons">
              <Button bsStyle="primary" type="submit">Change Password</Button>
            </div>

          </Form>

          <Form horizontal onSubmit={this.onEmailSubmit} noValidate>

            <FormGroup
              controlId="email"
              validationState={this.state.emailError ? 'error' : null}
            >
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                Email:
              </Col>
              <Col xs={8} sm={8}>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="New Email"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.email}
                />
                {this.state.emailError && <HelpBlock>{this.state.emailError}</HelpBlock>}
              </Col>
            </FormGroup>

            <div className="pull-right buttons">
              <Button bsStyle="primary" type="submit">Change Email Address</Button>
            </div>

          </Form>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ProfilePage);
