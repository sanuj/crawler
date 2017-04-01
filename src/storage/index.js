// NOTE: Not type checking this file.
import { MongoClient as client } from 'mongodb'

class Storage {
  dsn: string
  connected: boolean
  db: any

  constructor (config: { host?: string, port?: number, database: string }) {
    this.dsn = `mongodb://${config.host || 'localhost'}:${config.port || 27017}/${config.database}`
    this.connected = false
  }

  /** @private */
  connect () {
    if (this.connected) return true

    return new Promise((resolve, reject) => {
      client.connect(this.dsn, (error, db) => {
        if (error) return reject(error)

        this.db = db

        resolve(true)
      })
    })
  }

  async insert (collection: string, data: Array | Object) {
    await this.connect()

    return new Promise((resolve, reject) => {
      this.db.collection(collection).insertOne(data, (error, result) => {
        if (error) return reject(error)

        resolve(result)
      })
    })
  }
}
