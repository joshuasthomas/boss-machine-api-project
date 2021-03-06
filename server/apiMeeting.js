const express = require('express');
const meetingRouter = express.Router();
const db = require('./db');
const modelMeetings = 'meetings';
//initialize db
meetings = db.getAllFromDatabase(modelMeetings);

meetingRouter.get( "/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMeetings));
});

meetingRouter.post( "/", (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase(modelMeetings, newMeeting);
    res.status(201).send(newMeeting);
});

meetingRouter.delete( "/", (req, res, next) => {
    const arr = db.deleteAllFromDatabase(modelMeetings);
    res.status(204).send();
});

module.exports = meetingRouter;