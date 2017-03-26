const axios = require('axios')
const cheerio = require('cheerio')
const logger = require('../logger.js')
const urllib = require('url')
// const util = require('../util.js')

axios.defaults.timeout = 10000

function makeUrl (type, params = {}, base = 'http://www.amazon.in/') {
  const urls = {
    'base': base,
    'asin': base + 'dp/' + params,
    'listings': base + 'gp/offer-listing/' + params,
    'seller': base + 'sp?marketplaceID=' + params.marketplace_id + '&seller=' + params.seller_id
  }
  return urls[type]
}

const getBuyBoxSellerRedirectUrl = $ => $('#merchant-info').find('a').attr('href')
const getBuyBoxCurrency = $ => ($('#priceblock_ourprice').children().attr('class')).substring(8)
const getBuyBoxPrice = $ => ($('#priceblock_ourprice').text()).trim()
const getSellerInfoFromUrl = url => {
  const query = urllib.parse(url, true).query
  return {
    seller_id: query.seller,
    marketplace_id: query.marketplaceID
  }
}

function crawlSellerInfoFromUrl (url) {
  return new Promise((resolve, reject) => {
    axios.get(makeUrl('base') + url)
    .then(response => resolve(getSellerInfoFromUrl(response.request._currentUrl)))
    .catch(reject)
  })
}

function parseBuyBoxInfo (response) {
  // For debugging.
  // writeInFile(__dirname + '/../../files/asin-response.html', response.data)

  return new Promise((resolve, reject) => {
    const $ = cheerio.load(response.data)
    crawlSellerInfoFromUrl(getBuyBoxSellerRedirectUrl($))
      .then(sellerurl => resolve({
        seller: sellerurl,
        price: getBuyBoxPrice($),
        currency: getBuyBoxCurrency($)
      }))
  })
}

function crawlAsin (asin) {
  // For debugging.
  // util.readFromFile(__dirname + '/../../test/stubs/asin-response.html')
  //   .then(data => parseBuyBoxInfo({data: data})).then(console.log).catch(logger.error)

  axios.get(makeUrl('asin', asin))
    .then(parseBuyBoxInfo)
    .then(logger.info)
    .catch(logger.error)
}

exports.crawlAsin = crawlAsin
exports.getBuyBoxSellerRedirectUrl = getBuyBoxSellerRedirectUrl
exports.getBuyBoxCurrency = getBuyBoxCurrency
exports.getBuyBoxPrice = getBuyBoxPrice
exports.getSellerInfoFromUrl = getSellerInfoFromUrl
