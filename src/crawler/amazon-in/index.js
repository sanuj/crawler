// @flow
import http from 'axios'
import BuyBox from '../../entities/buy-box'
import BuyBoxParser from './parsers/buy-box'
import OfferListingParser from './parsers/offer-listing'

export default
class AmazonIndia implements CrawlerDriverContract {
  name: string
  base: string

  constructor () {
    this.name = 'Amazon India'
    this.base = 'https://amazon.in'
  }

  async buyBox (uid: string): Promise<BuyBox> {
    const product = await http.get(`${this.base}/dp/${uid}`)
    const listings = await http.get(`${this.base}/gp/offer-listing/${uid}`)

    return new BuyBox({
      current: BuyBoxParser.parse(product.data),
      listings: OfferListingParser.parse(listings.data)
    })
  }
}
