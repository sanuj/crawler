// @flow
import Entity from './entity'
import Seller from './seller'

export default
class Product extends Entity {
  get seller (): Seller {
    return this.get('seller')
  }

  get price (): Price {
    return this.get('price')
  }

  get shipping (): Price {
    return this.get('shipping')
  }

  get prime (): boolean {
    return this.get('prime')
  }

  get fulfilled (): boolean {
    return this.get('fulfilled')
  }

  get rating (): number {
    return this.get('rating')
  }

  get reviews (): number {
    return this.get('reviews')
  }
}
