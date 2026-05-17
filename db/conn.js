const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI;
const mongoURL = process.env.MONGO_URL || connectionString

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: async function (callback) {
    try {
    await client.connect();
    dbConnection = client.db('ejemplo');
    console.log('Successfully connected to MongoDB.');
    return callback();// si todo salio bien se ejecuta la funcion callback
  } catch (err) {
    // si hay un error se ejecuta la funcion callback con el error
    console.error('Error connecting to MongoDB:', err);
    return callback(err); 
} 
  },

  getDb: function () {
    return dbConnection;
  },
};
