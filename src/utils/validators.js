var validators = {
  // Email validity
  email: function(input) {
    return new Promise(function(resolve, reject) {
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailRegex.test(input.value)) {
        resolve();
      } else {
        reject({
          message: 'Invalid email address',
          input:   input
        });
      }
    });
  },
  // Required
  required: function(input) {
    return new Promise(function(resolve, reject) {
      if (!input.value || !input.value.length) {
        return reject({
          message: 'Input required',
          input:   input
        });
      }

      resolve();
    });
  }
}

export default validators;