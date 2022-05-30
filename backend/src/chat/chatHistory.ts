import fs from 'fs';
import fsPromises from 'fs/promises';
import path, { resolve } from 'path';

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
    if (!msgsFileExists) {
      return (
        new Promise(() => {
          resolve('');
        })
      )
    }
    const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
    const msgHistoryObj = {
      fileStr,
    }
    return fileStr
  } catch {
    console.error('Can\'t access file with messages!');
  }
}

export const addMsgToHistory = async (msg: object) => {
  const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
  let fileTemplateArr = [
    {
      message: 'initial template msg',
      date: new Date(),
      author: 'Author',
    }
  ];
  if (fileStr.length > 0) {
    fileTemplateArr = JSON.parse(fileStr);
  }
  const newArr: any = fileTemplateArr;
  newArr.push(msg);
  const fileJSON = JSON.stringify(newArr);
  const newWriteStream = fs.createWriteStream(msgsFilePath, { encoding: "utf8" });
  newWriteStream.write(fileJSON);
};
