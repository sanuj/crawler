import cheer from 'cheerio'
import query from 'querystring'
import { BuyBox, Seller } from '../../entities'

export const BASE = 'http://www.amazon.in'

export default class AmazonAsinPage {
  constructor (html) {
    this.html = html
  }

  get buyBox () {
    const $ = cheer.load(this.html)

    const seller = $('#merchant-info')
    const price = $('#priceblock_ourprice')
    const sellerText = seller.text()
    const matches = /sold by ([^(]+)[\s(]+([0-9.]+)[^|]+[|\s]+([0-9,]+)/i.exec(sellerText)
    const url = seller.children('a').attr('href')

    return new BuyBox({
      seller: new Seller({
        id: query.parse(url).seller,
        name: matches && matches[1],
        url: BASE + url,
        rating: parseFloat(matches && matches[2]),
        reviews: parseInt(matches && matches[3].replace(/[^0-9]/g, ''), 10),
        fulfilled: /fulfilled by amazon/i.test(sellerText),
      }),

      price: price.text().trim(),

      currency: (price.children('span')
        .attr('class') || '')
        .replace(/currency([^a-z])/i, any => any[1])
    })
  }
}