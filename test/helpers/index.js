require('./chai')
require('./sinon')

const resolve = any => require('path').resolve(__dirname, any)

const moduleAlias = require('module-alias')
moduleAlias.addAlias('src', resolve('../../src'))
moduleAlias.addAlias('test', resolve('../'))
