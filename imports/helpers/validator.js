export const errors = {
  username: {
    tooShort: 'Name is too short.',
  },
  email: {
    notValid: 'This is not valid email.',
  },
  password: {
    tooShort: 'Password is too short',
  },
  location: {
    notValid: 'This isn\'t valid location',
  },
};


const validate = (type, value) => {
  if (typeof value === 'undefined') {
    return 'No value specified';
  }
  if (type !== 'location' && typeof value === 'string' && value.length === 0) {
    return `${type.charAt(0).toUpperCase() + type.slice(1)} cannot be blank`;
  }
  switch (type) {
    case 'username': {
      if (value.length < 6) return errors.username.tooShort;
      return false; // false means lack of errors
    }
    case 'email': {
      // eslint-disable-next-line no-useless-escape
      const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexp.test(value)) return errors.email.notValid;
      return false;
    }
    case 'password': {
      if (value.length < 6) return errors.password.tooShort;
      return false;
    }
    case 'location': {
      if (value !== 'loc1' && value !== 'loc2') return errors.location.notValid;
      return false;
    }
    default: {
      return false;
    }
  }
};

export default validate;
