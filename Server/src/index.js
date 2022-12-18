const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

// data import
const { db } = require('./models');
const { dataUser, dataProduct, dataProductStat, dataTransaction } = require('./data');

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`.cyan);

  /**
   * add data one time
   */
  // db.users.insertMany(dataUser)
  // db.products.insertMany(dataProduct)
  // db.productStat.insertMany(dataProductStat)
  // db.transactions.insertMany(dataTransaction)
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
