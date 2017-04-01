// @flow
export default
class Entity implements EntityContract {
  _attributes: { [string]: any }

  constructor (attributes: { [string]: any }) {
    this._attributes = attributes
  }

  get (key: string): any {
    return this._attributes[key]
  }

  set (key: string, value: any): void {
    this._attributes[key] = value
  }

  toJSON (): string {
    return JSON.stringify(this._attributes)
  }

  toString (): string {
    return JSON.stringify(this._attributes, null, 2)
  }
}
