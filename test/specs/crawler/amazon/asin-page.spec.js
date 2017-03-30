import path from 'path'
import fs from 'fs'

import Page from 'src/crawler/amazon/asin-page'

const stub = any => path.resolve(path.resolve(__dirname, '../../../stubs/amazon'), any)

describe('crawler/amazon/asin', () => {
  it('should parse buy box', () => {
    const page = new Page(fs.readFileSync(stub('asin-page.html')))

    const buyBox = page.buyBox
    expect(buyBox.seller).not.to.be.null
    expect(buyBox.price).to.equal(237097.00)
    expect(buyBox.currency).to.equal('INR')

    const seller = buyBox.seller
    expect(seller.name).to.equal('e9accessories')
    expect(seller.rating).to.equal(4.7)
    expect(seller.reviews).to.equal(2194)
    expect(seller.id).to.equal('AWO781LMQ8MJ4')
  })
})
