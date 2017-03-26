const logger = require('./logger.js')

logger.info('Foo Bar!')

// For debugging.
var amazon = require('./crawler/amazon-asin.js')
amazon.crawlAsin('B01NCE2FHK')
