const cheerio = require('cheerio')
const path = require('path')

const util = require('../../../src/util.js')
const amazon = require('../../../src/crawler/amazon-asin.js')

const project = any => path.resolve(path.resolve(__dirname, '../../../'), any)

describe('amazon-asin', () => {
  describe('#getBuyBoxPrice()', () => {
    it('should return the buy box price', (done) => {
      util.readFromFile(project('test/stubs/asin-response.html'))
        .then(content => {
          const $ = cheerio.load(content)
          expect(amazon.getBuyBoxPrice($)).to.be.equal('222,492.00')

          done() // Async test completed.
        })
    })
  })

  describe('#getBuyBoxCurrency()', () => {
    it('should return the buy box currency', (done) => {
      util.readFromFile(project('test/stubs/asin-response.html'))
        .then(content => {
          const $ = cheerio.load(content)
          expect(amazon.getBuyBoxCurrency($)).to.be.equal('INR')

          done() // Async test completed.
        })
    })
  })

  describe('#getBuyBoxSellerRedirectUrl()', () => {
    it('should return the buy box seller redirect url', (done) => {
      util.readFromFile(project('test/stubs/asin-response.html'))
        .then(content => {
          const $ = cheerio.load(content)
          expect(amazon.getBuyBoxSellerRedirectUrl($)).to.be
            .equal('/gp/help/seller/at-a-glance.html/ref=dp_merchant_link?ie=UTF8&seller=A1QF42CTKPRMM0&isAmazonFulfilled=1')

          done() // Async test completed.
        })
    })
  })

  describe('#getSellerInfoFromUrl()', () => {
    it('should return marketplace_id and seller_id from url', (done) => {
      const sellerinfo = amazon.getSellerInfoFromUrl('https://www.amazon.in/sp?_encoding=UTF8&asin=&isAmazonFulfilled=1&isCBA=&marketplaceID=A21TJRUUN4KGV&orderID=&seller=A1QF42CTKPRMM0&tab=&vasStoreID=')
      expect(sellerinfo).to.have.property('seller_id').and.equal('A1QF42CTKPRMM0')
      expect(sellerinfo).to.have.property('marketplace_id').and.equal('A21TJRUUN4KGV')
      done()
    })
  })
})
