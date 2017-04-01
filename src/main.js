import logger from './logger'
import Crawler from './crawler'
import { version } from '../package.json'

import './util/interceptors'
logger.info(`Exponent Crawler ${version}`)

const crawler = new Crawler()
try {
  crawler.buyBox('B01NCE2FHK').then(box => logger.info(box.current.toString(), (box.listing || []).forEach(l => l.toString())))
} catch (e) {
  logger.error(e)
}
