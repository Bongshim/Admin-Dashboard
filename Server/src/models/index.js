const mongoose = require('mongoose');
const logger = require('../config/logger');
const { mongoDbUrl } = require('../config/config');
const users = require('./user.model');
const tokens = require('./token.model');
const products = require('./product.model');
const transactions = require('./transaction.model');
const productStat = require('./productStat.model');
const overallStat = require('./overallStat.model');
const affiliateStat = require('./affiliateStat.model');

module.exports = async () => {
  try {
    const conn = await mongoose.connect(mongoDbUrl);
    logger.info(`MongoDb connected: ${conn.connection.host}`.cyan);
  } catch (error) {
    process.exit(1);
  }
};

module.exports.db = {
  users,
  tokens,
  products,
  transactions,
  productStat,
  overallStat,
  affiliateStat,
};
