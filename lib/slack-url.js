module.exports = function (subdomain, token) {
  return 'https://' + subdomain +
  '.slack.com/services/hooks/incoming-webhook?token=' + token;
};
