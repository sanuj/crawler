'use strict';

let logger_singleton = null;

if(logger_singleton === null) {
  logger_singleton = require('winston');
}

module.exports = logger_singleton;
