var validators = {
  email: function(email) {
    return new Promise(function(resolve, reject) {
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailRegex.test(email)) {
        resolve();
      } else {
        reject('Invalid email address');
      }
    });
  }
}

export default validators;