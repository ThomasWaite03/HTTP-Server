
const TEXT_ENCODING = "utf-8";
const IMAGE_ENCODING = "base64";

const MIME_TYPES = {
  "txt": {
    subtype: "text/plain",
    encoding: TEXT_ENCODING
  },
  "html": {
    subtype: "text/html",
    encoding: TEXT_ENCODING
  },
  "css": {
    subtype: "text/css",
    encoding: TEXT_ENCODING
  },
  "js": {
    subtype: "text/javascript",
    encoding: TEXT_ENCODING
  },
  "jpg": {
    subtype: "image/jpeg",
    encoding: IMAGE_ENCODING
  },
  "jpeg": {
    subtype: "image/jpeg",
    encoding: IMAGE_ENCODING
  },
  "png": {
    subtype: "image/png",
    encoding: IMAGE_ENCODING
  },
  "ico": {
    subtype: "image/x-icon",
    encoding: IMAGE_ENCODING
  },
  "webp": {
    subtype: "image/webp",
    encoding: IMAGE_ENCODING
  },
  "svg": {
    subtype: "image/svg+xml",
    encoding: IMAGE_ENCODING
  },
  "gif": {
    subtype: "image/gif",
    encoding: IMAGE_ENCODING
  }
};

const STATUS_NAMES = {
  "200": "OK",
  "301": "Moved Permanently",
  "302": "Found",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "406": "Not Acceptable",
  "410": "Gone",
  "500": "Internal Server Error",
  "503": "Service Unavailable"
}

module.exports = {
  SERVER_NAME: 'Awesome Server',
  PORT: 80,
  SECURE_PORT: 443,
  IS_SECURE: true,
  MIME_TYPES,
  STATUS_NAMES,
  PRIVATE_KEY_FILENAME: "private-key.pem",
  CERTIFICATE_FILENAME: "public-cert.pem"
};
