var fs = require('fs');

exports.writeInFile = (file_name, content) => {
  fs.writeFile(file_name, content, err => {
    if(err) return logger.error(err);
    logger.info('Saved content to file ' + file_name);
  });
}

exports.readFromFile = file_name => {
  return new Promise((resolve, reject) => {
    fs.readFile(file_name, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
