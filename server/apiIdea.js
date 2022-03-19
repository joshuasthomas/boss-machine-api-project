const express = require('express');
const { is } = require('express/lib/request');
const ideaRouter = express.Router();
const db = require('./db');

//initialize db
const modelIdeas = 'ideas';
ideas = db.getAllFromDatabase(modelIdeas);

ideaRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelIdeas));
});

ideaRouter.post("/", (req, res, next) => {
    const newMinion = req.body;
    db.addToDatabase(modelIdeas, body);
    res.status(201).send();
});

//validate ideaId
ideaRouter.param( "ideaId", (req, res, next, id) => {
    //console.log(`Validate ideaId: ${id}`);
    const getIdea = ideas[id];
    if(getIdea) {
        //console.log("It's validated");
        next()
    } else {
        //console.log("I'm afraid its invalid.");
        res.status(404).send();
    }
});

ideaRouter.get(`/:ideaId`, (req, res, next) => {
    const id = req.params.ideaId;
    const reqMinion = db.getFromDatabaseById(modelIdeas, id);
    res.send(reqMinion);
});

ideaRouter.put(`/:ideaId`, (req, res, next) => {
    const id = req.params.ideaId;
    const upMinion = db.updateInstanceInDatabase(modelIdeas, ideas[id] );
    res.send(upMinion);
});

ideaRouter.delete(`/:ideaId`, (req, res, next) => {
    const id = req.params.ideaId;
    const isDeleted = db.deleteFromDatabasebyId(modelIdeas, id);
    if(isDeleted) {res.status(204).send()};
    
});

module.exports = ideaRouter;