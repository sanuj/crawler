import path from 'path'
import fs from 'fs'
import axios from 'axios'

import * as stub from 'test/helpers/stub'

import { default as Page, BASE } from 'src/crawler/amazon/asin-page'

describe('crawler/amazon/asin', () => {
  before(() => {
    stub.use('crawler/amazon', async any => (await axios.get(`${BASE}/dp/${any}`)).data)
  })

  it('should parse buy box', async () => {
    const page = new Page(await stub.load('asin-page', false))

    const buyBox = page.buyBox
    expect(buyBox.seller).not.to.be.undefined
    expect(buyBox.price).to.equal(237097.00)
    expect(buyBox.currency).to.equal('INR')

    const seller = buyBox.seller
    expect(seller.name).to.equal('e9accessories')
    expect(seller.rating).to.equal(4.7)
    expect(seller.reviews).to.equal(2194)
    expect(seller.id).to.equal('AWO781LMQ8MJ4')
  })

  it('should parse buy box on sale page', async () => {
    const page = new Page(await stub.load('asin-page-sale', false))

    const buyBox = page.buyBox
    expect(buyBox.seller).not.to.be.undefined
    expect(buyBox.price).to.equal(237097.00)
    expect(buyBox.currency).to.equal('INR')

    const seller = buyBox.seller
    expect(seller.name).to.equal('KIDA Retail')
    expect(seller.rating).to.equal(4.7)
    expect(seller.reviews).to.equal(7626)
    expect(seller.id).to.equal('A2LDOZCORWDDHX')
  })
})
