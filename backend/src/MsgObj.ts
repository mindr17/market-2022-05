import { IMsgObj } from "./types";

export default class MsgObj implements IMsgObj {
  author: string;
  message: string;
  date: Date;

  constructor(fileStr: IMsgObj) {
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

  static fromString(str: string) {
    try {
      return new MsgObj(JSON.parse(str));
    } catch(err) {
      return new MsgObj(
        {
          message: 'initial template msg',
          date: Date.now(),
          author: 'Author',
        }
      );
    }
  }
}
