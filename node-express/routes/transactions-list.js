var express = require('express');
var router = express.Router();
var mockDatabase = require('../mockDatabase/mockDatabase.json');

/* GET `/api/transactions-list/` */
router.get('/', function (req, res, next) {
  const startFromTransactionIndex = parseInt(req.query?.startFromTransactionIndex) || 0;
  const numberOfTransactionsPerPage = 5;
  
  const totalTransactionsCount = mockDatabase.length;

  const listOfTransactions = mockDatabase.slice(startFromTransactionIndex, startFromTransactionIndex + numberOfTransactionsPerPage);

  res.json({
    startFromTransactionIndex,
    totalTransactionsCount,
    numberOfTransactionsPerPage,
    listOfTransactions
  });
});

module.exports = router;
