const data = require('../data.js');
const Distance = require('../models/Distance.js');

exports.createDistance = async (req, res) => {
  // const distances = await Distance.deleteMany({});
  // res.send(distances);
  const distances = await Distance.insertMany(data.measureddistances);
  if (distances) {
    res
      .status(200)
      .send({ message: 'distances added successfully!', distances });
  } else {
    res.status(204).send({ message: 'distance is added unsuccessfully!' });
  }
};
