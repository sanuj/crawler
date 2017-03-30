import winston from 'winston'
import path from 'path'

import 'winston-daily-rotate-file'

const logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.resolve(__dirname, '../../logs/crawler'),
      datePattern: '-yyyy-MM-dd.log',
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      colorize: false,
      timestamp: true,
      handleExceptions: true
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(winston.transports.Console, {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  })
}

export default logger
