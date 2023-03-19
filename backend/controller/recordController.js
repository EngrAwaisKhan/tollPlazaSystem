const Record = require('../models/Record.js');
const Distance = require('../models/Distance.js');

exports.createRecord = async (req, res) => {
  const createdRecord = new Record({
    numberplate: req.body.numberplate,
    entrypoint: req.body.entrypoint,
    day: req.body.day,
  });
  createdRecord.save();
  res.send({ message: 'record added successfully!', createdRecord });
};

exports.updateRecord = async (req, res) => {
  const updatedRecord = await Record.findById(req.params.recordId);
  if (updatedRecord) {
    updatedRecord.exitpoint = req.body.exitpoint;

    if (req.body.entrypoint === req.body.exitpoint) {
      updatedRecord.totalCharges = 20; //base charges
    } else {
      const distance = await Distance.find({
        entrypoint: req.body.entrypoint,
        exitpoint: req.body.exitpoint,
      });
      if (distance) {
        if (
          updatedRecord.day === 'saturday' ||
          updatedRecord.day === 'sunday'
        ) {
          const totalCharges =
            20 +
            1.5 * (0.2 * parseInt(distance.map((obj) => obj.measureddistance)));
          updatedRecord.totalCharges = Math.round(totalCharges);
        } else {
          const totalCharges =
            20 + 0.2 * parseInt(distance.map((obj) => obj.measureddistance));
          updatedRecord.totalCharges = Math.round(totalCharges);
        }
      }
    }

    updatedRecord.save();

    res.send({ message: 'record updated successfully!', updatedRecord });
  }
};

exports.showAllRecord = async (req, res) => {
  const page = req.query.page || 0;
  const itemsPerPage = req.query.items || 6;

  const totalRecord = await Record.countDocuments();
  const countRecord = totalRecord / itemsPerPage;

  const allRecord = await Record.find({})
    .sort({ createdAt: -1 })
    .skip(page * itemsPerPage)
    .limit(itemsPerPage);
  if (allRecord.length > 0) {
    res.send({ allRecord, countRecord });
  } else {
    res.status(404).send({ message: 'No Record Found!' });
  }

  // res.send(allRecord);
};

exports.showRecord = async (req, res) => {
  const record = await Record.findById(req.params.recordId);
  res.send(record);
};

exports.deleteRecord = async (req, res) => {
  const record = await Record.findByIdAndDelete(req.params.recordId);
  if (record) {
    res.status(200).send({ message: 'Record Deleted Successfully!', record });
  } else {
    res.status(404).send({ message: 'Record not Found!' });
  }
};
