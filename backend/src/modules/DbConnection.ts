import { IDbConnection } from '../types';
import { Db, MongoClient } from 'mongodb';

class DbConnection implements IDbConnection {
  private _client: MongoClient;
  private _db: Db;
  
  constructor() {
    // const connection_url: string = 'mongodb://pocmbpdzfb:WbUoHEBV1i@mongodb.cloudno.de:27017/market22';
    const connection_url: string = 'mongodb://localhost:27017/market22';
    this._client = new MongoClient(connection_url);
    this._db = null;
  }
  
  public async init(): Promise<void> {
    try {
      const dbName: string = 'market22';
      await this._client.connect();
      console.log('Connected to database!');
      this._db = this._client.db(dbName);
      // const collection = db.collection('documents');
      // await collection.insertOne({some: 'sample data'});
    } catch(err) {
      throw new Error(err);
    } finally {
      console.log('connected!');
      // this._client.close();
    }
  }

  public get db() {
    if (this._db == null) throw new Error('Connection failed!');
    return this._db;
  }
}

export const dbConnection = new DbConnection();
