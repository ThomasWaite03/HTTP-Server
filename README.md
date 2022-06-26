# HTTP-Server
A simple http server built using Node.js.

To get started, run <code>node server.js</code>

The server serves static files from the directory where it runs. Next steps include adding support for GET/POST requests to the backend.

Server constants and settings can be found in the `source/config.js` file. To change whether the server communicates using HTTP or HTTPS, toggle the `IS_SECURE` variable in the config file.

Supported MIME types for static file hosting
-----------
* text/html
* text/css
* text/javascript
* text/plain
* image/jpeg
* image/png
* image/gif
* image/svg+xml
* image/webp
* image/x-icon
