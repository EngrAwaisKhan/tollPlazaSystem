const Distance = require('../models/Distance.js');

exports.showCity = async (req, res) => {
  
  const distances = await Distance.find({},{ exitpoint:0, measureddistance:0, createdAt:0, updatedAt:0, __v:0});
  if (distances) {
    res.send(distances)
}
};
