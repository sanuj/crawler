import * as amazon from './amazon'

const drivers = {amazon}

export default class CrawlerFactory {
  constructor () {
    this.driver = 'amazon'
  }

  async fetch (productId) {
    return await drivers[this.driver].fetch(productId)
  }
}
