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

    if(!newMinion){
        res.status(400).send();
    } else {
        db.addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
    }
});

//validate minionId
minionRouter.param("minionId", (req, res, next, id) => {
    //console.log(`Validate ideaId: ${id}`)
    const getMinion = minions[id];
    if(getMinion) {
        //console.log("It's validated");
        next()
    } else {
        //console.log("I'm afraid its invalid.");
        res.status(404).send("Minion is not found");
    }
})

minionRouter.get(`/:minionId`, (req, res, next) => {
    //console.log('test getting one');
    const id = req.params.minionId;
    //console.log("id: " + id);
    const reqMinion = db.getFromDatabaseById(modelMinions, id);
    //console.log(reqMinion);
    res.send(reqMinion);
});

minionRouter.put(`/:minionId`, (req, res, next) => {
    if(req.is('json'))
    {
        const id = req.params.minionId;
        //console.log("id: " + id);
        
        let tobeupd = db.getFromDatabaseById(modelMinions, id);
        //console.log(tobeupd);
        //console.log(req.body);
        const upMinion = db.updateInstanceInDatabase(modelMinions, req.body );
        //console.log(upMinion);

        res.send(upMinion);
    } else {
        res.status(400).send();
    }
    
});

minionRouter.delete(`/:minionId`, (req, res, next) => {
    const id = req.params.minionId;
    const isDeleted = db.deleteFromDatabasebyId(modelMinions, id);
    if(isDeleted) {res.status(204).send()};
    
});

module.exports = minionRouter;