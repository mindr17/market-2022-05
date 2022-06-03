// import fs from 'fs';
// import fsPromises from 'fs/promises';
// import path, { resolve } from 'path';
// import { dbConnection } from '../DbConnection';
// import { MsgObj } from '../MsgObj';

// const MSGS_FILE_NAME: string = 'msgHistory.json';
// const msgsFilePath: string = path.join(__dirname, MSGS_FILE_NAME);

// const checkFileExists = async (filePath: string): Promise<boolean> => {
//   try {
//     await fs.promises.access(filePath, fs.constants.F_OK)
//     return true
//   } catch (e) {
//     return false
//   }
// }

// export const getMsgsHistory = async () => {
//   // try {
//   //   console.log('getMsgsHistory called');
//   //   const db = dbConnection.db;
//   //   const collection = db.collection('documents');
//   //   // const somMsgObj = new MsgObj(fileStr);
//   //   const query: object = {};
//   //   const dbResponse = collection.find(query);
//   //   console.log('dbResponse: ', dbResponse);

//   //   // await collection.insertOne({some: 'sample data'});
//   // } catch(err) {

//   // }

//   try {
//     const collection = db.collection('documents');
//     await collection.insertOne({some: 'sample data'});
//     const db = dbConnection.db;
//     const msgsFileExists: boolean = await checkFileExists(msgsFilePath);
//     if (!msgsFileExists) {
//       return (
//         new Promise(() => {
//           resolve('');
//         })
//         )
//       }
//       // console.log('db: ', db);
//       const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
//     const msgHistoryObj = {
//       fileStr,
//     }
//     return fileStr
//   } catch(err) {
//     console.error('Can\'t access file with messages!');
//   }
// }

// export const addMsgToHistory = async (msg: object) => {
//   try {
//     const db = dbConnection.db;
//     const collection = db.collection('documents');
//     // await collection.insertOne({some: 'sample data'});

//   } catch(err) {

//   }
//   // const fileStr: string = await fsPromises.readFile(msgsFilePath, "utf8");
//   // if (fileStr.length > 0) {
//   //   fileTemplateArr = JSON.parse(fileStr);
//   // }
//   // const newArr: any = fileTemplateArr;
//   // newArr.push(msg);
//   // const fileJSON = JSON.stringify(newArr);
//   // const newWriteStream = fs.createWriteStream(msgsFilePath, { encoding: "utf8" });
//   // newWriteStream.write(fileJSON);
// };
