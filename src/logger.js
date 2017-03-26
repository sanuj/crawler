const winston = require('winston')
const path = require('path')
require('winston-daily-rotate-file')

const logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.resolve(__dirname, '../logs/crawler'),
      datePattern: '-yyyy-MM-dd.log',
      level: process.env.NODE_ENV !== 'production' ? 'info' : 'debug'
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(winston.transports.Console)
}

module.exports = logger
