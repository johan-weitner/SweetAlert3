var validators = {
  email: function(email, input) {
    console.log(email)
    return new Promise(function(resolve, reject) {
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailRegex.test(email)) {
        resolve();
      } else {
        reject({
          message: 'Invalid email address',
          input:   input
        });
      }
    });
  }
}

export default validators;