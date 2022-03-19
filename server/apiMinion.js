const express = require('express');
const { is } = require('express/lib/request');
const minionRouter = express.Router();
const db = require('./db');
const modelMinions = 'minions';
//initialize db
minions = db.getAllFromDatabase(modelMinions);

minionRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMinions));
});

minionRouter.post("/", (req, res, next) => {
    if(!req.body){  //no json body included
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

module.exports = minionRouter;