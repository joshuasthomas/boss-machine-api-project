const express = require('express');
const apiRouter = express.Router();
const db = require('./db');

const modelMinions = 'minions';
const modelIdeas = 'ideas';
const modelMeetings = 'meetings';
const modelWork = 'work';

// Covers '/minions' path
apiRouter.route(`/${modelMinions}`)
.get( (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMinions));
})
.post( (req, res, next) => {
    const newMinion = req.body;
})
.get('/:minionid', (req, res, next) => {
    
})
.put('/:minionid', (req, res, next) => {
    
})
.delete('/:minionid', (req, res, next) => {
    
});

// Covers '/ideas' path
apiRouter.route(`/${modelIdeas}`)
.get( (req, res, next) => {
    res.send(db.getAllFromDatabase(modelIdeas));
})
.post( (req, res, next) => {
    const newIdea = req.body;
})
.get('/:ideaid', (req, res, next) => {
    
})
.put('/:ideaid', (req, res, next) => {
    
})
.delete('/:ideaid', (req, res, next) => {
    
});

// Covers '/meetings' path
apiRouter.route(`/${modelMeetings}`)
get( (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMeetings));
})
.post( (req, res, next) => {
    const newMeeting = db.createMeeting();
    res.send(newMeeting);
})
.delete( (req, res, next) => {
    
});


module.exports = apiRouter;
