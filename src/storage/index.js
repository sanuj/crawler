// NOTE: Not type checking this file.
import MongodbDriver from './drivers/mongodb'

export default
class Storage {
  driver: string
  connections: { [string]: StorageDriver }

  constructor () {
    this.driver = 'mongodb'
    this.connections = {}
  }

  async insert (collection: string, data: Object): Promise<*> {
    await this.connect()

    return this.connection.insert(collection, data)
  }

  /** @private */
  get connection () {
    return this.connections[this.driver]
  }

  /** @private */
  connect (): Promise<*> {
    if (!(this.driver in this.connections)) {
      this[`create-${this.driver}`]()
    }

    return this.connection.connect()
  }

  /** @private */
  'create-mongodb' () {
    this.connections['mongodb'] = new MongodbDriver({})
  }
}
