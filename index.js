const { Client } = require('pg')
const moment = require('moment');

// can go to .env
const client = new Client({
  user: 'postgres',
  host: '172.17.0.2',
  database: 'mywallet2',
//   password: '1234',
  port: 5432,
})
client.connect()


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

// calculate total credit and total debit and balance;
const calci = async(startMonth, endMonth, userId) => {
    const startTime = moment().year(2019).month(startMonth-1).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
    const endTime = moment().year(2019).month(endMonth).date(0).hours(0).minutes(0).seconds(0).milliseconds(0);
    client.query(`SELECT amount, mode, timestamp FROM transactions WHERE userid = $1`, [userId], (err, res) => {
        transactions = res.rows;
        const totalTransactions = transactions.reduce((totalAmount, transaction)=>{
            // console.log('timestamp', transaction.timestamp);
            // console.log('transaction', moment(moment(transaction.timestamp)).isBetween(moment(startTime), moment(endTime)))
            
            if(moment(moment(transaction.timestamp)).isBetween(moment(startTime), moment(endTime))){
                // console.log('transaction mode', transaction.mode)
                if(transaction.mode=='debit'){
                    // console.log('debit amount', transaction.amount)
                    totalAmount.debit = Number(totalAmount.debit) + Number(transaction.amount)
                }else{
                    totalAmount.credit = Number(totalAmount.credit) + Number(transaction.amount)
                    // console.log('credit amount', transaction.amount)
                }
            }
            return totalAmount;
        }, {credit:0, debit: 0})
        console.log('total transactions', totalTransactions);
        console.log('total balance', totalTransactions.credit-totalTransactions.debit);
      })
}

// makeTransactions();
calci(3,5,1);