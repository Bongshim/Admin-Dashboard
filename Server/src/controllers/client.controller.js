const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { clientService } = require('../services');

const getProducts = catchAsync(async (req, res) => {
  const products = await clientService.getProducts();
  res.status(httpStatus.OK).json(products);
});

const getCustomers = catchAsync(async (req, res) => {
  const customers = await clientService.getCustomers();
  res.status(httpStatus.OK).json(customers);
});

const getTransactions = catchAsync(async (req, res) => {
  const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;
  const transactions = await clientService.getTransactions(page, pageSize, sort, search);
  res.status(httpStatus.OK).json(transactions);
});

module.exports = { getProducts, getCustomers, getTransactions };
