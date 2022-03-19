const express = require('express');
const { is } = require('express/lib/request');
const ideaRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const db = require('./db');

//initialize db
const modelIdeas = 'ideas';
ideas = db.getAllFromDatabase(modelIdeas);

ideaRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelIdeas));
});

ideaRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;

    if(!newIdea){
        res.status(400).send();
    } else {
        db.addToDatabase(modelIdeas, newIdea);
        res.status(201).send(newIdea);
    }
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
    //const id = req.params.ideaId;
    const upMinion = db.updateInstanceInDatabase(modelIdeas, req.body );
    res.send(upMinion);
});

ideaRouter.delete(`/:ideaId`, (req, res, next) => {
    const id = req.params.ideaId;
    const isDeleted = db.deleteFromDatabasebyId(modelIdeas, id);
    if(isDeleted) {res.status(204).send()};
    
});

module.exports = ideaRouter;