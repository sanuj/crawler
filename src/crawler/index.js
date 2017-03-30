import * as amazon from './amazon'

const drivers = {amazon}

export default class CrawlerFactory {
  constructor () {
    this.driver = 'amazon'
  }

  async fetch (asin) {
    return await drivers[this.driver].fetch(asin)
  }
}
