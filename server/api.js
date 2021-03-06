const express = require('express');
const apiRouter = express.Router();

// Minions Router
const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);

// Ideas Router
const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas', ideasRouter);

// meetings Router
const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
