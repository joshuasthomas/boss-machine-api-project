const express = require('express');
const { is } = require('express/lib/request');
const minionRouter = express.Router();
const db = require('./db');

//initialize db
const modelMinions = 'minions';
minions = db.getAllFromDatabase(modelMinions);

minionRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelMinions));
});

minionRouter.post("/", (req, res, next) => {
    const newMinion = req.body;
    db.addToDatabase(modelMinions, body);
});

//validate minionId
minionRouter.use("/:minionId", (req, res, next, id) => {
    const getMinion = minions[id];
    if(getMinion) {
        req.minionId = id;
        next()
    } else {
        res.status(404);
    }
})

minionRouter.get(`/:minionId`, (req, res, next) => {
    const id = req.minionId;
    const reqMinion = db.getFromDatabaseById(modelMinions, id);
    res.send(reqMinion);
});

minionRouter.put(`/:minionId`, (req, res, next) => {
    const id = req.minionId;
    const upMinion = db.updateInstanceInDatabase(modelMinions, minions[id] );
    res.send(upMinion);
});

minionRouter.delete(`/:minionId`, (req, res, next) => {
    const id = req.minionId;
    const isDeleted = db.deleteFromDatabasebyId(modelMinions, id);
    if(isDeleted) {res.status(204)};
    
});

module.exports = minionRouter;