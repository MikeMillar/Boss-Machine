const express = require('express');
const ideasRouter = express.Router();
const {createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase} = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const ideaId = id;
  const foundIdea = getFromDatabaseById('ideas', ideaId);
  if (isNaN(ideaId) || foundIdea === undefined || foundIdea === -1) {
    res.status(404).send();
  } else {
    req.id = ideaId;
    req.foundIdea = foundIdea;
    next();
  }
})

ideasRouter.get('', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.foundIdea);
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
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
  const deletedIdea = deleteFromDatabasebyId('ideas', req.id);
  if (deletedIdea === true) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

module.exports = ideasRouter;
