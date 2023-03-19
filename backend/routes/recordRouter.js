const express = require('express');
const recordController = require('../controller/recordController.js');

const recordRouter = express.Router();
recordRouter.post('/', recordController.createRecord); // Created New Record
recordRouter.put('/:recordId', recordController.updateRecord); // Update Record
recordRouter.get('/', recordController.showAllRecord); // Show all Records
recordRouter.get('/:recordId', recordController.showRecord); // Show specific Records
recordRouter.delete('/:recordId', recordController.deleteRecord); // Show all Records

module.exports = recordRouter;
