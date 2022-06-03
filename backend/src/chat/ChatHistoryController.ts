import { IMsgObj } from '../types';
import { Collection, Db, Document, FindCursor, OptionalId, WithId } from 'mongodb';
import { dbConnection } from '../modules/DbConnection';

export class ChatHistoryController {
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

  public async saveMessage(msg: OptionalId<Document>) {
    try {
      await this._collection.insertOne(msg);

    } catch(err) {

    }
  }
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
