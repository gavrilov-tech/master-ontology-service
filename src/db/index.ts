import { AnyError, Db, MongoClient, MongoClientOptions } from 'mongodb';

const connectionString = process.env.ATLAS_URI || 'mongodb://localhost:27017';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as MongoClientOptions);

let dbConnection: Db;

export default {
  connectToDb: function (callback: Function) {
    client.connect(function (error: AnyError, db: MongoClient) {
      if (error || !db) {
        return callback(error);
      }

      dbConnection = db.db('master_ontology');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};