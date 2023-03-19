const express = require('express');
const cityController = require('../controller/cityController.js');

const cityRouter = express.Router();

cityRouter.get('/', cityController.showCity); // Created New post

module.exports = cityRouter;
