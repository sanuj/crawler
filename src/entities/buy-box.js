// @flow

import Entity from './entity'
import Product from './product'

export default
class BuyBox extends Entity {
  get current (): Product {
    return this.get('current')
  }

  get listing (): Product[] {
    return this.get('listing')
  }
}
