const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { generalService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await generalService.getUser(id);
  res.status(httpStatus.OK).json(user);
});

module.exports = { getUser };
