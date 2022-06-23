const net = require('net');
const fs = require('fs');
const config = require('./config');
const responseBuilder = require('./response');

const server = net.createServer((socket) => {

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

    if (extension === null) {
      // If not getting a file, then redirect to a backend function
      console.log('Call to backend function or api endpoint.');
    } else {
      // If getting a file, retrieve it
      try {
        responseData = fs.readFileSync('./' + url, 'utf8');
        console.log(responseData);
      } catch (error) {
        console.error(error);
        if (error.code === 'ENOENT') {
          statusCode = 404;
        }
      }
    }

    const mimeType = config.MIME_TYPES[extension] || 'application/json';
    const resp = responseBuilder.createResponse(statusCode, responseData, mimeType);
    socket.end(resp.stringify());
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
    console.log(`ERROR: ${error}`);
  })
});

// Keep listening on the port
server.listen(config.PORT);
console.log('Listening...');
