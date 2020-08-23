const express = require('express');

const router = express.Router();
const { getAllTransactionsForUser, calci } = require('../models/transaction');


router.get('/:userId',(req, res)=>{
    getAllTransactionsForUser(req.params.userId)
        .then(result=>res.send(result))
        .catch(err=>res.send(err))
})

router.get('/balance/:userId',(req, res)=>{
    calci(req.query.startMonth, req.query.endMonth, req.params.userId)
        .then(result=>res.send(result))
        .catch(err=>req.send(err))
})


module.exports = router;
