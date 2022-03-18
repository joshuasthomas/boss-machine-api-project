const express = require('express');
const { is } = require('express/lib/request');
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
    db.addToDatabase(modelMinions, body);
});
apiRouter.route(`/${modelMinions}/minionid`)
.get((req, res, next) => {
    const id = req.params.minionid;
    const reqMinion = db.getFromDatabaseById(modelMinions, id);
    res.send(reqMinion);
})
.put((req, res, next) => {
    const id = req.params.minionid;
    const upMinion = db.updateInstanceInDatabase(modelMinions, db.getFromDatabaseById(modelMinions, id) );
    res.send(upMinion);
})
.delete((req, res, next) => {
    const id = req.params.minionid;
    const isDeleted = db.deleteFromDatabasebyId(modelMinions, id);
    res.send(isDeleted);
});

// Covers '/ideas' path
apiRouter.route(`/${modelIdeas}`)
.get( (req, res, next) => {
    res.send(db.getAllFromDatabase(modelIdeas));
})
.post( (req, res, next) => {
    const newIdea = req.body;
});
apiRouter.route(`/${modelIdeas}/ideaid`)
.get( (req, res, next) => {
    const id = req.params.ideaid;
    const reqMinion = db.getFromDatabaseById(modelMinions, id);
    res.send(reqMinion);
})
.put( (req, res, next) => {
    const id = req.params.ideaid;
    const upMinion = db.updateInstanceInDatabase(modelMinions, db.getFromDatabaseById(modelMinions, id) );
    res.send(upMinion);
})
.delete( (req, res, next) => {
    const id = req.params.ideaid;
    const isDeleted = db.deleteFromDatabasebyId(modelMinions, id);
    res.send(isDeleted);
});

// Covers '/meetings' path
apiRouter.route(`/${modelMeetings}`)
.get( (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMeetings));
})
.post( (req, res, next) => {
    const newMeeting = db.createMeeting();
    res.send(newMeeting);
})
.delete( (req, res, next) => {
    db.deleteAllFromDatabase(modelMeetings);
});


module.exports = apiRouter;
