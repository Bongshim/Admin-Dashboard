const mongoose = require('mongoose');
const { tokenTypes } = require('../config/tokens');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  blacklisted: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Token', tokenSchema);
