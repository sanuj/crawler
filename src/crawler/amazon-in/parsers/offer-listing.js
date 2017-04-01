// @flow
import cheerio from 'cheerio'
import query from 'querystring'

import Product from '../../../entities/product'
import Seller from '../../../entities/seller'

const parseAmount = (text: string): number => parseFloat(text.replace(/[^0-9]*([0-9.,]+).*/g, (_, price) => price.replace(/[,]/g, '')))

export default
class OfferListingParser implements ParserContract {
  static parse (content: string): Array<Product> {
    const products: CheerioElement[] = cheerio('.olpOfferList .olpOffer', content).get()

    return products.map(product => new Product({
      price: this.price(product),
      shipping: this.shipping(product),
      prime: this.isPrime(product),
      fulfilled: this.isFulfilled(product),
      rating: this.rating(product),
      reviews: this.reviews(product),
      seller: this.seller(product)
    }))
  }

  /** @private */
  static price (product: CheerioElement): Price {
    const selector = '.olpPriceColumn .olpOfferPrice'
    const amount: number = parseAmount(cheerio(selector, product).text())
    const currency: string = cheerio(`${selector} span[class^=currency]`, product).attr('class').replace('currency', '')

    if (Number.isNaN(amount)) {
      throw new Error(`Cannot parse price from: ${cheerio(product).html()}`)
    }

    return {
      amount,
      currency: currency || 'INR'
    }
  }

  /** @private */
  static shipping (product: CheerioElement): Price {
    const selector = '.olpPriceColumn .olpShippingInfo .olpShippingPrice'
    const amount: number = parseAmount(cheerio(selector, product).text())
    const currency: string = cheerio(`${selector} span[class^=currency]`, product).attr('class')

    return {
      amount: Number.isNaN(amount) ? 0 : amount,
      currency: currency ? currency.replace('currency', '') : 'INR'
    }
  }

  /** @private */
  static isPrime (product: CheerioElement): boolean {
    return /Amazon Prime/i.test(cheerio('.olpPriceColumn .a-icon-prime', product).text())
  }

  /** @private */
  static isFulfilled (product: CheerioElement): boolean {
    return cheerio('.olpDeliveryColumn .olpFbaPopoverTrigger', product).length > 0
  }

  /** @private */
  static rating (product: CheerioElement): number {
    const rating = parseFloat(cheerio('.olpSellerColumn i.a-icon-star', product).text())

    return Number.isNaN(rating) ? 0 : rating
  }

  /** @private */
  static reviews (product: CheerioElement): number {
    const reviews = parseInt(cheerio('.olpSellerColumn .olpSellerName + p', product)
      .text().replace(/[^(]*\([\s]*([0-9,]+).*/, (_, r) => r).replace(/,/g, ''))

    return Number.isNaN(reviews) ? 0 : reviews
  }

  /** @private */
  static seller (product: CheerioElement): Seller {
    const selector = '.olpSellerColumn .olpSellerName'
    const url = cheerio(`${selector} a`, product).attr('href')

    return new Seller({
      id: query.parse(url).seller,
      name: cheerio(selector, product).text().trim(),
      url
    })
  }
}
