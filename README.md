# HTTP-Server
A simple http server built using Node.js.

To get started, run `node server.js` from the root directory.

The server serves static files from the directory where it runs. Next steps include adding support for GET/POST requests to the backend.

Server constants and settings can be found in the `source/config.js` file. To change whether the server communicates using HTTP or HTTPS, toggle the `IS_SECURE` variable in the config file.

Installation Instructions
-------------------
The project can be installed globally using npm. It can then be used anywhere that has a private key and certificate in a subdirectory named `cryptography`. The module will then host any files found in the directory where it is running.<br>

#### To Install Globally
`node install --global "./Http Server"`

#### To Run
`npx awesome-server`


Supported MIME types for static file hosting
---------------------------------------------
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
