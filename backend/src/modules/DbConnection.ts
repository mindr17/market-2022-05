import { IDbConnection } from '../types';
import { Db, MongoClient } from 'mongodb';
import { config } from './../config';

class DbConnection implements IDbConnection {
  private _client: MongoClient;
  private _db: Db;
  
  constructor(client) {
    this._client = client;
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
    } catch (err) {
      throw new Error(err);
    } finally {
      console.log('connected!');
      // this._client.close();
    }
  }
  
  public get db(): Db {
    if (this._db == null) throw new Error('Connection failed!');
    return this._db;
  }
}

const connection_url: string = config.dbUrl;
export const dbConnection = new DbConnection(new MongoClient(connection_url));
