import logger from './logger'
import Crawler from './crawler'
import { version } from '../package.json'

logger.info(`Exponent Crawler ${version}`)

const crawler = new Crawler()
try {
  crawler.fetch('B01NCE2FHK').then(box => logger.info(JSON.stringify(box, null, 2)))
} catch (e) {
  logger.error(e)
}
