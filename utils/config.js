require('dotenv/config')

const config = {
    user : process.env.DEFAULT_USER,
    host : process.env.HOST,
    db : process.env.DATABASE,
    pass : process.env.PASSWORD,
    dbport : process.env.DB_PORT,
    serverPort : process.env.SERVER_PORT,
}


module.exports = config;
