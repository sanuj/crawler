require('./chai')
require('./sinon')

const moduleAlias = require('module-alias')
moduleAlias.addAlias('src', require('path').resolve(__dirname, '../../src'))
