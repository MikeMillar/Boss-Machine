const express = require('express');
const minionsRouter = express.Router();
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require('./db.js');

minionsRouter.param('minionId', (req, res, next, id) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
  const minionId = req.params.minionId;
  if (isNaN(minionId) || foundMinion === undefined || foundMinion === -1) {
    res.status(404).send();
  } else {
    req.minionId = minionId;
    req.minion = foundMinion;
    next();
  }
})

minionsRouter.get('', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
})

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
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

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const minionId = req.minionId;
  const foundMinion = req.minion;
  const foundWorks = getAllFromDatabase('work');
  const minionWork = foundWorks.filter(function(x) {
    return foundMinion.id === x.minionId;
  });
  res.send(minionWork);
})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  const minionId = req.minionId;
  const foundMinion = req.minion;
  const workId = req.params.workId;
  const foundWorks = getFromDatabaseById('work', workId);
  if (!foundWorks || foundWorks.minionId !== minionId) {
    res.status(400).send()
  } else {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const workId = req.params.workId;
  const foundWorks = deleteFromDatabasebyId('work', workId);
  if (foundWorks === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = minionsRouter;
