// @flow
function toJson (value) {
  if (Array.isArray(value)) {
    return value.map(any => toJson(any))
  } else if (value instanceof Entity) {
    return value.toJSON()
  } else {
    return value
  }
}

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

  toJSON (): Object {
    const keys = Object.keys(this._attributes)
    const result = {}

    keys.forEach(key => {
      result[key] = toJson(this._attributes[key])
    })

    return result
  }

  toString (): string {
    return JSON.stringify(this.toJSON())
  }
}
