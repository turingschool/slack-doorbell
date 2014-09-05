var restify = require('restify');

var messenger = require('./lib/messenger');
var slacker = require('./lib/slacker.js');

var server = restify.createServer({
  name: 'doorbell',
  version: '0.0.1'
});

server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

server.post('/messages', function (request, response, next) {
  var phoneNumber = request.params.From;
  var message = request.params.Body;

  slacker(phoneNumber, message, function (err, slackResponse, body) {
    if (err) {
      console.error(err);
      messenger.send(phoneNumber, 'There was some kind of error.');
      response.send(500, err);
    }
    messenger.send(phoneNumber, 'Got it! Someone will be up shortly to let you in.');
    response.send(200, 'ok');
  });
});

if (!module.parent) {
  server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
  });
}
