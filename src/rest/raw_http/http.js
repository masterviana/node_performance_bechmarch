var http = require('http');
var operations = require('../../lib/operation.js');
var server = http.createServer(handleRequest);

var PORT = 7272;
var helloWorld = '/hello_world';
var memoryCrud = '/mem_crud';
var redisCrud = '/redis_crud';
var mongoCrud = '/mongo_crud';

function handleRequest (request, response) {
  if (request.url == helloWorld) {
    server.helloWorld(request, response);
  }else if (request.url == memoryCrud) {
  }else if (request.url == redisCrud) {
    server.redisCrud(request, response);
  }else if (request.url == mongoCrud) {
  } else {
    response.end('Last else! It Works!! Path Hit: ' + request.url);
  }
}

// Lets start our server
server.listen(PORT, function () {
  // Callback triggered when server is successfully listening. Hurray!
  console.log('Server listening on: http://localhost:%s', PORT);
});

server.helloWorld = function (request, response) {
  operations.helloWorld(function (err, data) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(data);
  });
};
server.memoryCrud = function (request, response) {};
server.redisCrud = function (request, response) {
  operations.redisCrudOperation(function (err, data) {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end(err);
    } else {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(data);
    }

  });
};
