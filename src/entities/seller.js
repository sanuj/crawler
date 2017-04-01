// @flow
import Entity from './entity'

export default
class Seller extends Entity {
  get id (): string {
    return this.get('id')
  }

  get name (): string {
    return this.get('name')
  }

  get url (): string {
    return this.get('url')
  }
}
