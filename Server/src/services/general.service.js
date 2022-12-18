const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * getUser
 * @param {string}
 * @returns {Promise<User>}
 */
const getUser = async (id) => {
  const user = db.users.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

module.exports = { getUser };
