const express = require('express');
const { is } = require('express/lib/request');
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
    const getMinion = minions[id];
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

// work API
minionRouter.param('workId', (req, res, next, id) => {
    const getWork = works[id];
    if(getWork) {
        next()
    } else {
        res.status(404).send("Work is not found");
    }
})

minionRouter.get('/:minionId/work', (req, res, next) => {
    const allWorks = db.getAllFromDatabase(modelWork);
    let selectedMinionWorks = []
    let selectedWork = {};
    for (let i = 0; i < allWorks.length - 1; i += 1) {
        selectedWork = allWorks[i];
        if(selectedWork.minionId = req.params.minionId) {
            selectedMinionWorks.push(selectedWork);
        }
    }
    if(selectedMinionWorks) {
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
    /*const allWorks = db.getAllFromDatabase(modelWork);
    let selectedWork = {};
    for (let i = 0; i < allWorks.length - 1; i += 1) {
        selectedWork = allWorks[i];
        if(selectedWork.minionId = req.params.minionId) {
            break;
        }
    }*/
    if(req.is('json'))
    {
        const upWork = db.updateInstanceInDatabase(modelWork, req.body );
        res.send(upWork);
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