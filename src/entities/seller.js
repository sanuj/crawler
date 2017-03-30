import Entity from './entity'

export default class Seller extends Entity {
  get id () {
    return this._attributes['id']
  }

  get name () {
    return this._attributes['name']
  }

  get url () {
    return this._attributes['url']
  }

  get rating () {
    return this._attributes['rating']
  }

  get reviews () {
    return this._attributes['reviews']
  }

  get fulfilled () {
    return this._attributes['fulfilled']
  }
}
