import fs from 'fs';
import fsPromises from 'fs/promises';
import path, { resolve } from 'path';
import { pathToFileURL } from 'url';

const MSGS_FILE_NAME: string = 'msgHistory.json';
const msgsFilePath: string = path.join(__dirname, MSGS_FILE_NAME);

const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK)
    return true
  } catch (e) {
    return false
  }
}

export const getMsgsHistory = async () => {
  try {
    const msgsFileExists: boolean = await checkFileExists(msgsFilePath);
    console.log('msgsFileExists: ', msgsFileExists);
    if (!msgsFileExists) {
      return (
        new Promise(() => {
          resolve('');
        })
        )
    }
    const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
    const writeStream = fs.createWriteStream(msgsFilePath, { encoding: "utf8" });
    // console.log('fileJson: ', fileJson);
    // const result: Promise<string> = new Promise(() => {[]});
    const msgHistoryObj = {
      fileStr,
      writeStream,
    }
    return msgHistoryObj
  } catch {
    console.error('Can\'t access file with messages!');
  }
  // return new Promise(() => {
  //   resolve('');
  // });

}

export const addMsgToHistory = async (oldWriteStream, msg: object) => {
  console.log('msg: ', msg);

  const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
  // const oldMsgsArr = JSON.parse(fileJson);
  // console.log('oldMsgsArr: ', oldMsgsArr);
  // oldMsgsArr.push
  // const newArr = [...fileJson, msg]
  // const newJson = JSON.stringify(newArr);
  const newArr = fileStr + msg;
  const newStr = newArr.toString();
  const newWriteStream = fs.createWriteStream(msgsFilePath, { encoding: "utf8" });
  newWriteStream.write(newStr);

  // const fileWithMsg = 
  // if () {

  // }

};
