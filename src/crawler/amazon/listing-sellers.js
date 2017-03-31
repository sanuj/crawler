import cheer from 'cheerio'
import query from 'querystring'
import { BuyBox, Seller } from '../../entities'

export const BASE = 'http://www.amazon.in'

export default class AmazonListingSellers {
  constructor (html) {
    this.$ = cheer.load(this.html)
  }

  get sellerPrices () {
    return this.$('.olpOfferPrice').map((i, el) => {
      return $(el).children().clone().children().remove().end().text().trim()
    }).get()
  }

  get sellerRedirectUrls () {
    return this.$('.olpSellerName').map((i, el) => {
      return $(el).find('a').attr('href')
    }).get()
  }

  get sellerInfos () {
    return this.$('.olpSellerName').next().clone().map((i, el) => {
      let ch = $(el).children()
      return [ch.eq(0).text(),
        ch.eq(1).text(),
        ch.remove().end().text().trim()]
    }).get()
  }

  get shippingPrices () {
    return this.$('.olpShippingInfo').map((i, el) => {
      let fee = $(el).children().children().first().text().trim()
      return fee == 'FREE Delivery' ? '0' : fee.replace(/Rs. /g,"")
    }).get()
  }

  get isPrime () {
    return this.$('.olpShippingInfo').prev().map((i, el) => {
      return $(el).text().toLowerCase() === 'amazon prime tm';
    }).get()
  }

  get productConditions () {
    return this.$('.olpCondition').map((i, el) => {
      return $(el).text().trim().toLowerCase();
    }).get()
  }

  get isFBA () {
    return this.$('.olpSellerName').map((i, el) => {
      return urllib.parse($(el).find('a').attr('href'), true).query.isAmazonFulfilled
    }).get()
  }

  get listingSellers () {
    // TODO: Convert these into seller objects.
    return {
      sellerPrices: this.sellerPrices,
      sellerRedirectUrls: this.sellerRedirectUrls,
      sellerInfos: this.sellerInfos,
      FBA: this.isFBA,
      prime: this.isPrime,
      conditions: this.productConditions
    }
  }
}
