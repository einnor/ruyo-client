export const isRequired = (values, value) => {
  if (typeof value === 'string') {
    return value && value.length;
  }

  if (Array.isArray(value)) {
    // catch an array value and do nothing. assume it passes
    return true;
  }

  if (typeof value === 'number') {
    // returning true because a number will be valid
    return true;
  }

  if (typeof value === 'object') {
    // this is a bit complex as a lot of things are objects in JS.
    if (value === null || value === 'undefined') {
      return false;
    }

    if (Object.keys(value) && Object.keys(value).length) {
      let checked = false;
      Object.keys(value).forEach((key) => {
        if (value[key]) {
          checked = true;
        }
      });

      return checked;
    }
    return true;
  }

  return false;
};

export const isEmailValid = (values, email: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

export const isPasswordValid = (password: string) => {
  /**
   * ^	The password string will start this way.
   * (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character.
   * (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character.
   * (?=.*[0-9])	The string must contain at least 1 numeric character.
   * (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict.
   * (?=.{8,})	The string must be eight characters or longer.
   *
   */
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return regEx.test(password);
};
