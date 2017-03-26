'use strict'

var axios = require('axios')
var cheerio = require('cheerio')
var logger = require('../logger.js')
// var util = require('../util.js')

axios.defaults.timeout = 10000

function makeUrl (type, params = null, base = 'http://www.amazon.in/') {
  const urls = {
    'base': base,
    'asin': base + 'dp/' + params,
    'listings': base + 'gp/offer-listing/' + params,
    'seller': base + 'sp?marketplaceID=' + params.marketplace_id + '&seller=' + params.seller_id
  }
  return urls[type]
}

var getBuyBoxSeller = $ => $('#merchant-info').find('a').attr('href')
var getBuyBoxCurrency = $ => ($('#priceblock_ourprice').children().attr('class')).substring(8)
var getBuyBoxPrice = $ => ($('#priceblock_ourprice').text()).trim()

function parseBuyBoxInfo (response) {
  // For debugging.
  // writeInFile(__dirname + '/../../files/asin-response.html', response.data);

  const $ = cheerio.load(response.data)
  const buyboxseller = getBuyBoxSeller($)
  const buyboxcurrency = getBuyBoxCurrency($)
  const buyboxprice = getBuyBoxPrice($)
  logger.info(buyboxseller)
  logger.info(buyboxcurrency)
  logger.info(buyboxprice)
}

function crawlAsin (asin) {
  // For debugging.
  // util.readFromFile(__dirname + '/../../test/files/asin-response.html')
  //   .then(data => parseBuyBoxInfo({data: data}));

  axios.get(makeUrl('asin', asin))
    .then(parseBuyBoxInfo)
    .catch(logger.error)
}

exports.crawlAsin = crawlAsin
exports.getBuyBoxSeller = getBuyBoxSeller
exports.getBuyBoxCurrency = getBuyBoxCurrency
exports.getBuyBoxPrice = getBuyBoxPrice
