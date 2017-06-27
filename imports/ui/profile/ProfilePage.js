import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.clearForm = this.clearForm.bind(this);
    this.onFormFieldUpdate = this.onFormFieldUpdate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.onEmailSubmit = this.onEmailSubmit.bind(this);
    this.state = {
      email: '',
      name: '',
      password: '',
      oldPassword: '',
      location: '',
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

  onSubmit(e) {
    e.preventDefault();
    const currentUser = Meteor.user();
    Meteor.users.update(Meteor.userId(), { $set: {
      username: this.state.name || currentUser.username,
      profile: {
        location: this.state.location || currentUser.profile.location,
      },
    } });
    this.clearForm('profile');
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    Accounts.changePassword(this.state.oldPassword, this.state.password);
    this.clearForm('password');
  }

  onEmailSubmit(e) {
    e.preventDefault();
    if (this.state.email.length === 0) return;
    Meteor.users.update(Meteor.userId(), { $set: {
      emails: [{ address: this.state.email }],
    } });
  }

  clearForm(form) {
    switch (form) {

      case 'profile':
        this.setState({
          name: '',
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

  render() {
    return (
      <div className="panel panel-default row profile-page">

        <div className="col-xs-12 col-sm-6 col-sm-offset-2">
          <Form horizontal onSubmit={this.onSubmit}>

            <FormGroup controlId="name">
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                Name:
              </Col>
              <Col xs={8} sm={8}>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Your name"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.name}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="location">
              <Col componentClass="ControlLabel" xs={4} sm={4}>
                Location:
              </Col>
              <Col xs={8} sm={8}>
                <select
                  name="location"
                  id="location"
                  className="form-control"
                  onChange={this.onFormFieldUpdate}
                  value={this.state.location}
                >
                  <option value="" disabled>Select Your Location</option>
                  <option value="loc1">Location 1</option>
                  <option value="loc2">Location 2</option>
                </select>
              </Col>
            </FormGroup>

            <div className="pull-right buttons">
              <Button bsStyle="primary" type="submit">Save Changes</Button>
            </div>

          </Form>

          <Form horizontal onSubmit={this.onPasswordSubmit}>
            <FormGroup controlId="oldpassword">
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
              </Col>
            </FormGroup>

            <FormGroup controlId="password">
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
              </Col>
            </FormGroup>

            <div className="pull-right buttons">
              <Button bsStyle="primary" type="submit">Change Password</Button>
            </div>

          </Form>

          <Form horizontal onSubmit={this.onEmailSubmit}>

            <FormGroup controlId="email">
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

export default ProfilePage;
