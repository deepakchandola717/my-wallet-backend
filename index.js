const express = require('express');
const config = require('./utils/config')
const app = express();
const cors = require('cors');
const transactions = require('./routes/transactions');

app.use(cors({ origin: true, credentials: true }));
app.use('/transactions', transactions);



app.listen(config.serverPort, ()=>{
    console.log(`listening on port ${config.serverPort}`)
});
