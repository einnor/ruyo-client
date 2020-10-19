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
