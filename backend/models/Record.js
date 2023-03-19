const mongoose = require('mongoose');

const recordSchema = mongoose.Schema(
  {
    numberplate: { type: String, required: true },
    entrypoint: { type: String, required: true },
    exitpoint: { type: String },
    day: { type: String, required: true },
    totalCharges: { type: Number },
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
