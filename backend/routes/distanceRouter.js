const express = require('express');
const distanceSeederController = require('../controller/distanceSeederController.js');

const distanceRouter = express.Router();

distanceRouter.get('/', distanceSeederController.createDistance); // Created New post

module.exports = distanceRouter;
