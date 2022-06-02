import { MongoClient } from 'mongodb';

// const connection_url: string = 'mongodb://pocmbpdzfb:WbUoHEBV1i@mongodb.cloudno.de:27017/market22';
const connection_url: string = 'mongodb://localhost:27017/market22';
const dbName: string = 'market22';

const client: MongoClient = new MongoClient(connection_url);

export class DbConnection {
  constructor() {
  }

  private async connect() {
    try {
      await client.connect();
      console.log('Connected to database!');
      const db = client.db(dbName);
      // const collection = db.collection('documents');
      // await collection.insertOne({some: 'sample data'});
      return db;
    } catch(err) {
      throw new Error(err);
    } finally {
      console.log('connected!');
      () => client.close();
    }
  }
  
  public get db() {
    return this.connect();
  }
}
