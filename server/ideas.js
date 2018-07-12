const express = require('express');
const ideasRouter = express.Router();
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.get('', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
  const ideaId = req.params.ideaId;
  if (isNaN(ideaId) || foundIdea === undefined || foundIdea === -1) {
    res.status(404).send();
  } else {
    res.send(foundIdea);
  }
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const foundidea = getFromDatabaseById('ideas', req.params.ideaId);
  const ideaId = req.params.ideaId;
  const updatedidea = updateInstanceInDatabase('ideas', req.body);
  if (isNaN(ideaId) || foundidea === undefined || foundidea === -1) {
    res.status(404).send();
  } else {
    res.send(updatedidea);
  }
})

ideasRouter.post('', checkMillionDollarIdea, (req, res, next) => {
  addedidea = addToDatabase('ideas', req.body);
  if (addedidea !== req.body) {
    res.status(400).send();
  } else {
    res.status(201).send(addedidea);
  }
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
  deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdea === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = ideasRouter;
