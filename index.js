const express = require('express');
const config = require('./utils/config')
const app = express();
const transactions = require('./routes/transactions');

app.use('/transactions', transactions);


app.listen(3333, ()=>{
    console.log(`listening on port ${config.serverPort}`)
});
