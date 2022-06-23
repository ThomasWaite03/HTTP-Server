const config = require('./config');

module.exports = {
  createResponse: function(statusCode, body = null, contentType = null) {
    const response = {
      headers: {
        Connection: "Closed",
        Server: `${config.SERVER_NAME}`
      },
      stringify: function() {
        let headersText = [];
        Object.entries(this.headers).forEach(([key, value]) => {
          headersText.push(`${key}: ${value}`);
        });
        headersText = headersText.sort();

        const statusLine = `HTTP/1.1 ${statusCode} ${config.STATUS_NAMES[String(statusCode)]}`;
        headersText.unshift(statusLine);
        headersText = headersText.join('\r\n') + '\r\n\r\n';

        return headersText + (this.body || '');
      }
    };

    // If error occurred
    if (statusCode >= 300) {
      const error = statusCode + ' ' + config.STATUS_NAMES[String(statusCode)];
      response.body = `<html><head><title>${error}</title></head><body><h1 style="text-align: center">Error: ${error}</h1></body></html>`;
      return response;
    }

    if (body) {
      if (typeof body === 'object' && contentType === 'application/json') {
        response.body = JSON.stringify(body);
      } else {
        response.body = body;
      }

      response.headers["Content-Type"] = `${contentType || 'text/plain'}; charset=${config.ENCODING}`;
      response.headers["Content-Length"] = response.body.length;
    }

    return response;
  }
};
