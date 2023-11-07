var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var transactionsListRouter = require('./routes/transactions-list');
var transactionDetailsRouter = require('./routes/transaction-details');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/transactions-list', transactionsListRouter);
app.use('/api/transaction-details', transactionDetailsRouter);

module.exports = app;
