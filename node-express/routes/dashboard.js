var express = require('express');
var router = express.Router();
var mockDatabase = require('../mockDatabase/mockDatabase.json');

/* GET `/api/dashboard/` */
router.get('/', function (req, res, next) {
  const totalTransactionsCount = mockDatabase.length;

  res.json({
    totalTransactionsCount,
    
  });
});

module.exports = router;
