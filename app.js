// using hapi for accepting http requests
// plugins:
// good - logging
// joi - validation

var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');

var mandrill = require('node-mandrill')('0voleNnKpPRJBpKS5-ywSw');

// setup the hapi server
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 5555
});

// setup the /ask route
server.route({
  method: 'POST',
  path: '/ask',
  handler: function(request, reply){

    var message = {
        to: [{email: 'barry@io.co.za', name: 'Barry Botha'}, {email: 'jonathan@io.co.za', name: 'Jonathan Endersby'}],
        from_email: 'ask@myrights.io.co.za',
        subject: "MyRights India Question",
        text: "Question: " + request.payload.question
    }

    sendMail(message);

    reply.redirect(request.payload.redirect_url);

  },
  config: {
    validate: {
      payload: {
        question: Joi.string().required(),
        redirect_url: Joi.string().required()
      }
    }
  }
});

// setup the /help route
server.route({
  method: 'POST',
  path: '/help',
  handler: function(request, reply){

    var textMessage = '';

    if (typeof(request.payload.phone_number) !== 'undefined' && request.payload.phone_number){
      textMessage = textMessage += "Phone Number: " + request.payload.phone_number + "\r\n";
    }

    if (typeof(request.payload.email) !== 'undefined' && request.payload.email){
      textMessage = textMessage += "Email: " + request.payload.email + "\r\n";
    }

    var message = {
        to: [{email: 'barry@io.co.za', name: 'Barry Botha'}, {email: 'jonathan@io.co.za', name: 'Jonathan Endersby'}],
        from_email: 'help@myrights.io.co.za',
        subject: "MyRights India Call for Help!",
        text: textMessage
    }

    sendMail(message);

    reply.redirect(request.payload.redirect_url);

  },
  config: {
    validate: {
      payload: {
        email: Joi.string().email(),
        phone_number: Joi.string(),
        redirect_url: Joi.string().required()
      }
    }
  }
});

// setup the logger
server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      args: [{ log: '*', response: '*' }]
    }]
  }
}, function(err){

  if (err){
    throw err;
  }

});

// lets go
server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
});

// function that sends mail
function sendMail(message){

  server.log('info', 'Sending mail: ' + JSON.stringify(message));

  mandrill('/messages/send', {
    message: message
  },
    function(err, response){
      console.log(response);
      if (err){
        server.log('debug', 'Error sending mail: ' + JSON.stringify(error));
        return( JSON.stringify(error) );
      }else{
        server.log('info', 'Email Sent');
        return( response );
      }
    }
  );

}