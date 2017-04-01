import axios from 'axios'

import * as stub from 'test/helpers/stub'

import Page from 'src/crawler/amazon-in/parsers/offer-listing'

describe('crawler/amazon/asin', () => {
  before(() => {
    stub.use('crawler/amazon-in', async any => (await axios.get(`http://amazon.in/gp/offer-listing/${any}`)).data)
  })

  it('should parse buy box', async () => {
    const products = Page.parse(await stub.load('listing-sellers-page', false))

    expect(products.length).to.equal(4)

    let product = products[0]
    expect(product.seller, 'have a seller').not.to.be.undefined
    expect(product.price.amount, 'have a price').to.equal(236999.00)
    expect(product.price.currency, 'have a price in known currency').to.equal('INR')
    expect(product.shipping.amount, 'have a shipping price').to.equal(0.00)
    expect(product.shipping.currency, 'have a shipping price in known currency').to.equal('INR')
    expect(product.rating, 'have a star rating').to.equal(4.5)
    expect(product.reviews, 'have reviews').to.equal(11679)
    expect(product.fulfilled, 'can be fulfilled').to.equal(true)
    expect(product.prime, 'can be prime').to.equal(true)

    let seller = product.seller
    expect(seller.name, 'have a seller name').to.equal('KIDA Retail')
    expect(seller.id, 'have a unique seller id').to.equal('A2LDOZCORWDDHX')

    product = products[1]
    expect(product.seller, 'have a seller').not.to.be.undefined
    expect(product.price.amount, 'have a price').to.equal(236999.00)
    expect(product.price.currency, 'have a price in known currency').to.equal('INR')
    expect(product.shipping.amount, 'have a shipping price').to.equal(0.00)
    expect(product.shipping.currency, 'have a shipping price in known currency').to.equal('INR')
    expect(product.rating, 'have a star rating').to.equal(4.5)
    expect(product.reviews, 'have reviews').to.equal(6807)
    expect(product.fulfilled, 'can be fulfilled').to.equal(true)
    expect(product.prime, 'can be prime').to.equal(true)

    seller = product.seller
    expect(seller.name, 'have a seller name').to.equal('e9accessories')
    expect(seller.id, 'have a unique seller id').to.equal('AWO781LMQ8MJ4')

    product = products[2]
    expect(product.seller, 'have a seller').not.to.be.undefined
    expect(product.price.amount, 'have a price').to.equal(237499.00)
    expect(product.price.currency, 'have a price in known currency').to.equal('INR')
    expect(product.shipping.amount, 'have a shipping price').to.equal(280.00)
    expect(product.shipping.currency, 'have a shipping price in known currency').to.equal('INR')
    expect(product.rating, 'have a star rating').to.equal(4)
    expect(product.reviews, 'have reviews').to.equal(66)
    expect(product.fulfilled, 'can be fulfilled').to.equal(false)
    expect(product.prime, 'can be prime').to.equal(false)

    seller = product.seller
    expect(seller.name, 'have a seller name').to.equal('CONCEPT INDIA')
    expect(seller.id, 'have a unique seller id').to.equal('A35NJ558AFK807')

    product = products[3]
    expect(product.seller, 'have a seller').not.to.be.undefined
    expect(product.price.amount, 'have a price').to.equal(240990.00)
    expect(product.price.currency, 'have a price in known currency').to.equal('INR')
    expect(product.shipping.amount, 'have a shipping price').to.equal(0.00)
    expect(product.shipping.currency, 'have a shipping price in known currency').to.equal('INR')
    expect(product.rating, 'have a star rating').to.equal(4.5)
    expect(product.reviews, 'have reviews').to.equal(698)
    expect(product.fulfilled, 'can be fulfilled').to.equal(false)
    expect(product.prime, 'can be prime').to.equal(false)

    seller = product.seller
    expect(seller.name, 'have a seller name').to.equal('Kochar Computers')
    expect(seller.id, 'have a unique seller id').to.equal('AKBQR4OZP5SYL')
  })
})
