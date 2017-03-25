var assert = require('assert');
var util = require('../src/util.js');
var amazon = require('../src/crawler/amazon-asin.js');
var cheerio = require('cheerio');

describe('amazon-asin', function() {

  describe('#getBuyBoxPrice()', function() {
    it('should return the buy box price', function() {
      let $ = null;
      util.readFromFile(__dirname + '/files/asin-response.html')
        .then(content => {
          $ = cheerio.load(content);
          assert.equal('222,492.00', amazon.getBuyBoxPrice($));
        });
    });
  });

});
