import axios from 'axios'

import * as stub from 'test/helpers/stub'

import Page from 'src/crawler/amazon-in/parsers/buy-box'

describe('crawler/amazon/parsers/buy-box', () => {
  before(() => {
    stub.use('crawler/amazon-in', async any => (await axios.get(`https://www.amazon.in/dp/${any}`)).data)
  })

  it('should parse buy box', async () => {
    const product = Page.parse(await stub.load('asin-page', false))

    expect(product.seller).not.to.be.undefined
    expect(product.price.amount).to.equal(237097.00)
    expect(product.price.currency).to.equal('INR')
    expect(product.rating).to.equal(4.7)
    expect(product.reviews).to.equal(2194)

    const seller = product.seller
    expect(seller.name).to.equal('e9accessories')
    expect(seller.id).to.equal('AWO781LMQ8MJ4')
  })

  it('should parse buy box on sale page', async () => {
    const product = Page.parse(await stub.load('asin-page-sale', false))

    expect(product.seller).not.to.be.undefined
    expect(product.price.amount).to.equal(237097.00)
    expect(product.price.currency).to.equal('INR')
    expect(product.rating).to.equal(4.7)
    expect(product.reviews).to.equal(7626)

    const seller = product.seller
    expect(seller.name).to.equal('KIDA Retail')
    expect(seller.id).to.equal('A2LDOZCORWDDHX')
  })
})

describe('crawler/amazon/parsers/buy-box (live)', () => {
  before(() => {
    stub.use('crawler/amazon-in/buy-box', async any => (await axios.get(`https://www.amazon.in/dp/${any}`)).data)
  })

  const asins = [
    `B01NCE2FHK`,
    // `B007E9E9CK`, // FIXME: Unknown reason.
    // `074325807X`, // FIXME: Cannot handle books, yet.
    `B00JWIY9IK`, `B00Q6K11DS`, `B01AW1U2L8`, `B01I1Z6AM2`, `B01M59KN5H`, `B06WGTMS7V`]

  asins.forEach(asin => {
    it(`should parse ${asin} correctly`, async () => {
      const product = Page.parse(await stub.load(asin))

      // console.log(product.toString())

      expect(product.seller, 'have a seller').not.to.be.undefined
      expect(product.price, 'have a price').not.to.be.undefined
      expect(product.price.amount, 'have a price').to.be.above(0)
      expect(product.price.currency, 'have a price in known currency').to.be.string
      expect(product.rating, 'have a star rating').to.be.number
      expect(product.reviews, 'have reviews').to.be.nuber
      expect(product.fulfilled, 'can be fulfilled').to.be.boolean
      expect(product.prime, 'can be prime').to.be.boolean

      const seller = product.seller
      expect(seller.name, 'have a seller name').to.be.string
      expect(seller.id, 'have a unique seller id').to.be.string

      return true
    })
  })
})
