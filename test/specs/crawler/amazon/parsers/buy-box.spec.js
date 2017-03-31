import axios from 'axios'

import * as stub from 'test/helpers/stub'

import { BASE, default as Page } from 'src/crawler/amazon-in/parsers/buy-box'

describe('crawler/amazon/asin', () => {
  before(() => {
    stub.use('crawler/amazon', async any => (await axios.get(`${BASE}/dp/${any}`)).data)
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
