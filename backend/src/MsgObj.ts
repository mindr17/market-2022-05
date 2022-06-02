import { IMsgObj } from "./types";

export class MsgObj implements IMsgObj {
  message: string;
  date: Date;
  author: string;

  constructor(fileStr: any) {
    if (typeof fileStr.message !== 'string') {
      throw new Error('Wrong type of message');
    }
    if (typeof fileStr.author !== 'string') {
      throw new Error('Wrong type of author');
    }
    this.message = fileStr.message;
    this.author = fileStr.author;
    const date = new Date(fileStr.date);
    this.date = date;
  }

  static fromString(str) {
    try {
      return new MsgObj(JSON.parse(str));
    } catch(err) {
      return new MsgObj(
          {
            message: 'initial template msg',
            date: Date.now(),
            author: 'Author',
          }      
        )
    }
  }
}
