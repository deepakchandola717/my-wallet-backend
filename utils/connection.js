const { Client } = require('pg')
const config = require('./config');

const dbClient = new Client({
    user: config.user,
    host: config.host,
    database: config.db,
    port: config.dbport,
});


const connectDb = async (client) => {
    await client.connect((err) => {
      if (err) {
        console.error('connection error', err.stack);
      } else {
        console.log('connected\ndatabase:', client.database);
      }
    });
  };
  
  
connectDb(dbClient);
  

module.exports = {dbClient};