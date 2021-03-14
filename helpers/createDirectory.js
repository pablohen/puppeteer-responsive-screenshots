const fs = require('fs');

const createDirectory = (hostname) => {
  fs.mkdir(`./screenshots/${hostname}`, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

module.exports = createDirectory;
