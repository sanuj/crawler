// @flow
import cheer from 'cheerio'
import query from 'querystring'
import Product from '../../../entities/product'
import Seller from '../../../entities/seller'

export default
class BuyBoxParser implements ParserContract {
  static parse (content: string): Product {
    const $ = cheer.load(content)

    const seller = $('#merchant-info')
    const price = $('#priceblock_ourprice, #priceblock_saleprice')
    const sellerText = seller.text()
    const matches = /([^(]*)[\s(]+([0-9.]+)[^|]+[|\s]+([0-9,]+)/i.exec(sellerText)
    const url = seller.children('a').attr('href')

    return new Product({
      seller: new Seller({
        id: query.parse(url).seller,
        name: $('#merchant-info a:first-child').text().trim(),
        url: `https://amazon.in${url}`
      }),

      price: {
        amount: parseFloat(price.text().trim().replace(/[^0-9.]/g, '')),
        currency: (price.children('span')
          .attr('class') || '')
          .replace(/.*currency([a-z]+).*/i, (_, c) => c)
      },

      // TODO: Parse shipping info from buy box.

      rating: parseFloat(matches && matches[2]),
      reviews: parseInt(matches && matches[3].replace(/[^0-9]/g, ''), 10),
      fulfilled: /fulfilled by amazon/i.test(sellerText)
    })
  }
}
