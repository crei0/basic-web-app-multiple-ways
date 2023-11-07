var express = require('express');
var router = express.Router();
var mockDatabase = require('../mockDatabase/mockDatabase.json');

/* GET `/api/transaction-details/:id` */
router.get('/:transactionId', function (req, res, next) {
  const targetId = req.params?.transactionId;
  
  const result = mockDatabase.filter(transaction => transaction.id === targetId);
  // console.log('transaction-details.js #10 > result', result);

  if (result) {
    res.json(...result);
  } else {
    res.json({});
  }
});

module.exports = router;
