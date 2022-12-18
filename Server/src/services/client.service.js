const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * get products
 * @returns {Promise<productWithStats>}
 */
const getProducts = async () => {
  const products = await db.products.find();
  const productWithStats = await Promise.all(
    products.map(async ({ _id, _doc }) => {
      const stat = await db.productStat.find({
        productId: _id,
      });
      return {
        ..._doc,
        stat,
      };
    })
  );

  return productWithStats;
};

/**
 * get customers
 * @returns {Promise<customers>}
 */
const getCustomers = async () => {
  const customers = await db.users.find({ role: 'user' }).select('-password');
  return customers;
};

/**
 * generate sort
 */
const generateSort = (sort) => {
  const sortParsed = JSON.parse(sort);
  const sortFormatted = {
    [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
  };
  return sortFormatted;
};

/**
 * get transactions
 * @returns {Promise<transactions>}
 */
const getTransactions = async (page, pageSize, sort, search) => {
  const sortFormatted = Boolean(sort) ? generateSort(sort) : {};

  const transactions = await db.transactions
    .find({
      $or: [
        {
          cost: { $regex: new RegExp(search, 'i') },
        },
        {
          userId: { $regex: new RegExp(search, 'i') },
        },
      ],
    })
    .sort(sortFormatted)
    .skip(parseInt(page) * parseInt(pageSize))
    .limit(parseInt(pageSize));

  const total = await db.transactions.find({
    $or: [
      {
        cost: { $regex: new RegExp(search, 'i') },
      },
      {
        userId: { $regex: new RegExp(search, 'i') },
      },
    ],
  }).count()

  return { transactions, total };
};

module.exports = { getProducts, getCustomers, getTransactions };
