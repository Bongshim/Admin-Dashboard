const mongoose = require('mongoose');

const { Schema } = mongoose;

const affiliateStatSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: 'Transaction',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AffiliateStat', affiliateStatSchema);
