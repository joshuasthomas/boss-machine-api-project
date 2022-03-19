const express = require('express');
const { is } = require('express/lib/request');
const apiRouter = express.Router();
const db = require('./db');

// Mount new minionRouter below at the '/minions' path.
const minionRouter = require('./apiMinion.js');
apiRouter.use('/minions', minionRouter);

// Mount new ideaRouter below at the '/ideas' path.
const ideaRouter = require('./apiIdea.js');
apiRouter.use('/ideas', ideaRouter);

// Mount new meetingRouter below at the '/ideas' path.
const meetingRouter = require('./apiMeeting.js');
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;
