var request = require('request');
var url = require('./slack-url')(process.env.SLACK_DOMAIN, process.env.SLACK_TOKEN);

module.exports = function (caller, message, callback) {
  var body = {
    channel:  '#doorbell',
    text: caller + ': ' + message,
    username: 'Doorbell',
    icon_emoji: ':door:'
  };

  var options = {
    url: url,
    body: JSON.stringify(body)
  };

  request.post(options, function(err, res, body) {
    if (err) console.error(err);
    if (typeof callback === 'function') callback(err, res, body);
  });
};
