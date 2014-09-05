if (process.env.NODE_ENV === 'production') {
  var twilio = {
    account: process.env.TWILIO_ACCOUNT_ID,
    token: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER
  }

  var twilio = require('twilio')(twilio.account, twilio.token);

  module.exports = {
    send: function (number, message) {
      var messages = [].concat(message);
      messages.forEach(function (message) {
        twilio.sms.messages.create({
          body: message,
          to: number,
          from: twilio.phoneNumber
        }, function(err, response) {
          if (err) console.log(err);
          console.log('Sent:', response.sid, number, message);
        });
      });
    }
  };
} else {
  module.exports = {
    send: function (number, message) {
      var messages = [].concat(message);
      messages.forEach(function (message) {
        console.log('Sent:', message);
      });
    }
  };
}
