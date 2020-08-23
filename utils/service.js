//common function to interact with database
const { dbClient } = require('./connection');

const queryDB = (query, params=[]) => {
    return new Promise((resolve, reject)=>{
        dbClient.query(query, [...params], (err, res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}

// this module can include everything from loggers to other stuff

module.exports = queryDB;