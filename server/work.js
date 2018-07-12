const express = require('express');
const workRouter = express.Router();
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require('./db.js');

workRouter.get('', (req, res, next) => {
  res.send(getAllFromDatabase('work'));
})

module.exports = workRouter;
