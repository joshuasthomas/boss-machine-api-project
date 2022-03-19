const express = require('express');
const minionRouter = express.Router();
const db = require('./db');
const modelMinions = 'minions';
const modelWork = 'work';

//initialize db
minions = db.getAllFromDatabase(modelMinions);
works = db.getAllFromDatabase(modelWork);

minionRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMinions));
});

minionRouter.post("/", (req, res, next) => {
    const newMinion = req.body;
    if(!newMinion){  //no json body included
        res.status(400).send();
    } else {
        db.addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
    }
});

//validate minionId
minionRouter.param("minionId", (req, res, next, id) => {
    const getMinion = db.getFromDatabaseById(modelMinions, id);
    if(getMinion) {
        next()
    } else {
        res.status(404).send("Minion is not found");
    }
})

minionRouter.get(`/:minionId`, (req, res, next) => {
    const reqMinion = db.getFromDatabaseById(modelMinions, req.params.minionId);
    res.send(reqMinion);
});

minionRouter.put(`/:minionId`, (req, res, next) => {
    if(req.is('json'))
    {
        const upMinion = db.updateInstanceInDatabase(modelMinions, req.body );
        res.send(upMinion);
    } else {
        res.status(400).send();
    }
});

minionRouter.delete(`/:minionId`, (req, res, next) => {
    const id = req.params.minionId;
    const isDeleted = db.deleteFromDatabasebyId(modelMinions, id);
    if(isDeleted) { res.status(204).send() };
});

// Work API

//validate workId
minionRouter.param('workId', (req, res, next, id) => {
    const getWork = db.getFromDatabaseById(modelWork, id);
    if(getWork) {
        next()
    } else {
        res.status(404).send("Work is not found");
    }
})

minionRouter.get('/:minionId/work', (req, res, next) => {
    const allWorks = db.getAllFromDatabase(modelWork);
    let selectedMinionWorks = [];
    for (let i = 0; i < allWorks.length - 1; i += 1) {
        //loop every work instance, add matching minionId to array
        let selectedWork = allWorks[i];
        if(selectedWork.minionId = req.params.minionId) {
            selectedMinionWorks.push(selectedWork);
        }
    }
    if(selectedMinionWorks) {
        //array has values
        res.send(selectedMinionWorks);
    } else {
        res.status(404).send();
    }
});

minionRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = req.body;
    if(!newWork){  //no json body included
        res.status(400).send();
    } else {
        db.addToDatabase(modelWork, newWork);
        res.status(201).send(newWork);
    }
});

minionRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.is('json'))
    {
        const allMinions = db.getAllFromDatabase(modelMinions);
        if(!allMinions[req.body.minionId]) {
            res.status(400).send(); //minionId in request is not valid, may differ from minionId used in PUT call
        } else {
            const upWork = db.updateInstanceInDatabase(modelWork, req.body );
            res.send(upWork);
        }
    } else {
        res.status(400).send();
    }
});

minionRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const workId = req.params.workId;
    const isDeleted = db.deleteFromDatabasebyId(modelWork, workId);
    if(isDeleted) { res.status(204).send() };
});

module.exports = minionRouter;