const net = require('net');
const tls = require('tls');
const fs = require('fs');
const config = require('./source/config');
const responseBuilder = require('./source/response');


var options = {
  key: fs.readFileSync(`cryptography/${config.PRIVATE_KEY_FILENAME}`),
  cert: fs.readFileSync(`cryptography/${config.CERTIFICATE_FILENAME}`)
};

function socketHandler(socket) {
  // Receive data
  socket.on('data', (data) => {
    data = String(data);
    const requestLine = data.slice(0, data.indexOf('\r\n')).split(' ');
    const requestMethod = requestLine[0];
    const url = requestLine[1];

    // Get the file extension if the url contains one
    let extension = null;
    if (url.includes('.')) {
      extension = url.split('.')[1];
    }

    let responseData = null;
    let statusCode = 200;
    let encoding = "utf-8"

    if (extension === null) {
      // If not getting a file, then redirect to a backend function
      console.log('Call to backend function or api endpoint.');
    } else {
      // If getting a file, retrieve it
      encoding = config.MIME_TYPES[extension] ? config.MIME_TYPES[extension].encoding : encoding;
      try {
        responseData = fs.readFileSync('./' + url, encoding);
      } catch (error) {
        if (error.code === 'ENOENT') {
          statusCode = 404;
        } else {
          console.log(error);
        }
      }
    }

    const mimeType = config.MIME_TYPES[extension] ? config.MIME_TYPES[extension].subtype : null;
    const resp = responseBuilder.createResponse(statusCode, responseData, encoding, mimeType);

    if (resp.body){
      socket.write(resp.getHeaderString());
      socket.end(resp.body, encoding);
    } else {
      socket.end(resp.getHeaderString());
    }

  });

  // Handle closing connections
  socket.on('close', (hasError) => {
    if (hasError) {
      console.log('Closing connection due to error...');
    } else {
      console.log('Closing connection...');
    }
  });

  // Handle errors here
  socket.on('error', (error) => {
    console.log(error);
  });
};

// If secure setting is true, create a connection using tls, otherwise just use http
const server = config.IS_SECURE ? tls.createServer(options, socketHandler) : net.createServer(socketHandler);

// Keep listening on the port
server.listen(config.IS_SECURE ? config.SECURE_PORT : config.PORT);
console.log('Listening...');
