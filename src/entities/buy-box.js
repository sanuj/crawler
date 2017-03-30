import Entity from './entity'

export default class BuyBox extends Entity {
  get seller () {
    return this._attributes['seller']
  }

  get price () {
    return this._attributes['price']
  }

  get currency () {
    return this._attributes['currency']
  }
}
