const express = require('express');
const minionsRouter = express.Router();
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require('./db.js');

minionsRouter.get('', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
})

minionsRouter.get('/:minionId', (req, res, next) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
  const minionId = req.params.minionId;
  if (isNaN(minionId) || foundMinion === undefined || foundMinion === -1) {
    res.status(404).send();
  } else {
    res.send(foundMinion);
  }
})

minionsRouter.put('/:minionId', (req, res, next) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
  const minionId = req.params.minionId;
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  if (isNaN(minionId) || foundMinion === undefined || foundMinion === -1) {
    res.status(404).send();
  } else {
    res.send(updatedMinion);
  }
})

minionsRouter.post('', (req, res, next) => {
  addedMinion = addToDatabase('minions', req.body);
  if (addedMinion !== req.body) {
    res.status(400).send();
  } else {
    res.status(201).send(addedMinion);
  }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinion === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = minionsRouter;
