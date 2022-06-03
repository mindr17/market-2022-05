import { IMsgObj } from '../types';
import { Collection, Db, FindCursor, WithId } from 'mongodb';
import { dbConnection } from '../modules/DbConnection';

export class ChatHistory {
  private _collection: Collection;
  // private _chatHistory: IMsgObj[];
  
  constructor() {
    const db: Db = dbConnection.db;
    this._collection = db.collection('chatMessages');
  }

  // public async getHistory(): Promise<IMsgObj[]> {
  public async getHistory(): Promise<any> {
    try {
      // const somMsgObj = new MsgObj(fileStr);
      const query: object = {};
      // const cursor: FindCursor<WithId<Document>> = collection.find(query);
      const cursor = this._collection.find(query);
      const dbResponse = await cursor.toArray();

      return dbResponse;
    } catch(err) {
      console.error(`Chat messages collection is broken! ${err}`);
    }
  }

  public async saveMessage(msg) {
    try {
      const db = dbConnection.db;
      await this._collection.insertOne(msg);
  
    } catch(err) {
  
    }
  }
}

// export const getMsgsHistory = async () => {
//   try {
//     // const somMsgObj = new MsgObj(fileStr);
//     const db: Db = dbConnection.db;
//     const collection: Collection = db.collection('documents');
//     // console.log('collection: ', collection);
//     const query: object = {};
//     const cursor = collection.find(query).toArray(function(err, items) {
//       console.log('items: ', items);
//     });
//     // console.log('cursor: ', cursor);

//     // const dbResponse = collection.find(query);
//     // console.log('dbResponse: ', dbResponse);

//     // await collection.insertOne({some: 'sample data'});
//   } catch(err) {
//     console.error(err);
//   }
//   // try {
//     // const collection = db.collection('documents');
//     // await collection.insertOne({some: 'sample data'});
//   //   const db = dbConnection.db;
//   //   const msgsFileExists: boolean = await checkFileExists(msgsFilePath);
//   //   if (!msgsFileExists) {
//   //     return (
//   //       new Promise(() => {
//   //         resolve('');
//   //       })
//   //       )
//   //     }
//   //     // console.log('db: ', db);
//   //     const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
//   //   const msgHistoryObj = {
//   //     fileStr,
//   //   }
//   //   return fileStr
//   // } catch(err) {
//   //   console.error('Can\'t access file with messages!');
//   // }
// }

export const addMsgToHistory = async (msg: object) => {
  try {
    const db = dbConnection.db;
    const collection = db.collection('documents');
    await collection.insertOne({some: 'sample data'});

  } catch(err) {

  }
  // const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
  // if (fileStr.length > 0) {
  //   fileTemplateArr = JSON.parse(fileStr);
  // }
  // const newArr: any = fileTemplateArr;
  // newArr.push(msg);
  // const fileJSON = JSON.stringify(newArr);
  // const newWriteStream = fs.createWriteStream(msgsFilePath, { encoding: "utf8" });
  // newWriteStream.write(fileJSON);
};
