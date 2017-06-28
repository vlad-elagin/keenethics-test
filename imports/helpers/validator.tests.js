/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import validate, { errors } from './validator';

if (Meteor.isClient) {
  describe('Validator', () => {
    describe('username validation', () => {
      it('passes length test', () => {
        const value = 'test username';
        assert.equal(false, validate('username', value));
      });

      it('fails length test', () => {
        const value = 'test';
        assert.equal(errors.username.tooShort, validate('username', value));
      });
    });

    describe('email validation', () => {
      it('passes email test', () => {
        const value = 'test@test.com';
        assert.equal(false, validate('email', value));
      });

      it('fails email test', () => {
        const value = 'test_email.com';
        assert.equal(errors.email.notValid, validate('email', value));
      });
    });

    describe('password validation', () => {
      it('passes length test', () => {
        const value = 'test password';
        assert.equal(false, validate('password', value));
      });

      it('fails length test', () => {
        const value = 'test';
        assert.equal(errors.password.tooShort, validate('password', value));
      });
    });

    describe('location validation', () => {
      it('passes test', () => {
        const value = 'loc1';
        assert.equal(false, validate('location', value));
      });

      it('fails test', () => {
        const value = 'loc4';
        assert.equal('This isn\'t valid location', validate('location', value));
      });
    });
  });
}
