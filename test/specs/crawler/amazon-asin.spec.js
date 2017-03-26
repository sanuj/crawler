const cheerio = require('cheerio')
const path = require('path')

const util = require('../../../src/util.js')
const amazon = require('../../../src/crawler/amazon-asin.js')

const project = any => path.resolve(path.resolve(__dirname, '../../../'), any)

describe('amazon-asin', () => {
  describe('#getBuyBoxPrice()', () => {
    it('should return the buy box price', (done) => {
      let $ = null
      util.readFromFile(project('test/stubs/asin-response.html'))
        .then(content => {
          $ = cheerio.load(content)
          expect(amazon.getBuyBoxPrice($)).to.be.equal('222,492.00')

          done() // Async test completed.
        })
    })
  })
})
