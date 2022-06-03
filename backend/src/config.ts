import 'dotenv';

const configTemplate = {
  "devConfig": {
    port: 3000,
    dbUrl: 'mongodb://localhost:27017/market22',
  },
  "prodConfig": {
    port: 3000,
    // dbUrl: 'mongodb://pocmbpdzfb:WbUoHEBV1i@mongodb.cloudno.de:27017/market22';
    dbUrl: 'mongodb://localhost:27017/market22',
  }
}

const configType = (process.env.NODE_ENV !== 'development') 
  ? 'devConfig'
  : 'prodConfig'


// export const config = configTemplate[configType];
export const config = configTemplate['prodConfig'];
