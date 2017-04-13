// @flow
import AmazonIndia from './amazon-in'
import BuyBox from '../entities/buy-box'

const drivers: { [string]: CrawlerDriverContract } = {
  'amazon.in': new AmazonIndia()
}

export default
class CrawlerFactory {
  driver: string

  constructor (driver: string = 'amazon.in') {
    this.driver = driver
  }

  use (driver: ?string): CrawlerDriverContract {
    return drivers[typeof (driver) === 'string' ? driver : this.driver]
  }

  async buyBox (id: string): Promise<BuyBox> {
    return this.use().buyBox(id)
  }
}
