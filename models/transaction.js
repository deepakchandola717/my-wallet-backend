const queryDB = require('../utils/service');
const queries = require('../utils/constants');

const moment = require('moment');

//get all transactions for given user
const getAllTransactionsForUser = async(userId) =>{
    return new Promise((resolve, reject)=>{
        console.log('get all transactions called')
        queryDB(queries.getTransactionForUser, [userId])
                                        .then(res=>{
                                            console.log('received response', res.rows)
                                            resolve(res.rows)})
                                        .catch(err=>{
                                            console.log('error receieved', err)
                                            reject(err)});
    })
}


//create fake transactions

const makeTransactions=()=>{
    // for adding transactions for the year 2019
    const UserId = 1;
    walletid = 1;
    let startTime = moment('2019-01-01 00:00:00+00').format();
    for(let month = 0; month<12; month++){
        const currentTime = moment(startTime).add(month, 'months');
        for(let i = 0; i<100; i++){
            let amount = Math.floor(Math.random()*11)*100;
            let mode = Math.floor((Math.random()*10))%2===0?'credit':'debit';
            let transactionTime = moment(currentTime).add(i, 'minutes');
            createTransaction(UserId, amount, mode, 1, transactionTime);
        }
    }
}


//get total credit, debit and balance for a month
const calci = (startMonth, endMonth, userId) => {
    return new Promise(async(resolve, reject)=>{
        const startTime = moment().year(2019).month(startMonth-1).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
        const endTime = moment().year(2019).month(endMonth).date(0).hours(0).minutes(0).seconds(0).milliseconds(0);
        const transactions = await queryDB(queries.getTransactionForUser, [userId])
                                .then(res=>res.rows)
                                .catch(err=>{
                                    console.log('err', err);
                                    reject(err);
                                });
        const totalTransactions = transactions.reduce((totalAmount, transaction)=>{
            if(moment(moment(transaction.timestamp)).isBetween(moment(startTime), moment(endTime))){
                if(transaction.mode=='debit'){
                    totalAmount.debit = Number(totalAmount.debit) + Number(transaction.amount)
                }else{
                    totalAmount.credit = Number(totalAmount.credit) + Number(transaction.amount)
                }
            }
            return totalAmount;
        }, {credit:0, debit: 0})
        const transactionInfo = {totalTransactions, balance:totalTransactions.credit-totalTransactions.debit}
        resolve(transactionInfo);
    })
}



// can go inside functions

// client.query('CREATE TABLE if not exists "users" (userid serial primary key, username varchar, name varchar, email varchar)', (err, res) => {
//   console.log(err, res)
// })

// client.query('CREATE TABLE if not exists "wallets" ( walletid serial primary key, userid int references users(userid), total_credit Numeric(10,2), total_debit Numeric(10,2), month int, year int, balance NUMERIC(10,2), timestamp timestamptz default now())', (err, res) => {
// console.log(err, res)
// })
// client.query('CREATE TABLE if not exists "wallets" ( walletid serial primary key, userid int references users(userid), total_credit Numeric(10,2), total_debit Numeric(10,2), month int, year int, balance NUMERIC(10,2), timestamp timestamptz default now())', (err, res) => {
// console.log(err, res)
// })

// client.query('CREATE TABLE if not exists "transactions" (transaction_id serial, userid int references users(userid), walletid int references wallets(walletid), transaction_code uuid, amount NUMERIC(10,2), mode varchar, timestamp timestamptz default now())', (err, res) => {
//     console.log(err, res)
//   })

const createUser = (username, name, email) => {
    client.query('INSERT INTO users(username, name, email) values($1,$2,$3)', [username, name, email], (err, res) => {
        console.log(err, res)
        })
}

const createTransaction = (userId, amount, mode, walletId, transactionTime) => {
    client.query('Insert into transactions (userid, amount, mode, walletid, timestamp) values($1,$2,$3,$4,$5)', [userId, amount, mode, walletId,  transactionTime], (err, res) => {
        console.log(err, res)
      })
}

const createWalletEntry = (userId, balance) => {
    client.query('Insert into wallets (userid) values($1)', [userId], (err, res) => {
        console.log(err, res)
      })
}

module.exports ={getAllTransactionsForUser, calci};