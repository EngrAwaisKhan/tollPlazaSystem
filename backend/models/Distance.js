const mongoose = require('mongoose');

const distanceSchema = mongoose.Schema(
  {
    entrypoint: { type: String, required: true },
    exitpoint: { type: String, required: true },
    measureddistance: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Distance = mongoose.model('Distance', distanceSchema);

module.exports = Distance;
