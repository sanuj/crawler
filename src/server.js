import express from 'express'

import logger from './logger'
import Crawler from './crawler'
import { version } from '../package.json'

import './util/interceptors'
logger.info(`Exponent Crawler ${version}`)

const crawler = new Crawler()
const app = express()

app.get('/', async (request, response) => {
  if (typeof (request.query.uid) !== 'string') {
    return response.status(400).send('Invalid request! Cannot find `uid` in query.')
  }

  const box = await crawler.buyBox(request.query.uid)

  return response.set('Content-Type', 'application/json')
                 .status(200)
                 .send(box.toString())
})

app.listen(3000, () => logger.info('Exponent Crawler Server Started on port 3000...'))