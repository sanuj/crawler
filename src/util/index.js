import fs from 'fs'
import logger from './logger'

exports.writeInFile = (filename, content) => {
  fs.writeFile(filename, content, err => {
    if (err) return logger.error(err)
    logger.info(`Saved content to file ${filename}`)
  })
}

exports.readFromFile = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
