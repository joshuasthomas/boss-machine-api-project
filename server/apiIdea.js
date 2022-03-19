const express = require('express');
const { is } = require('express/lib/request');
const ideaRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const db = require('./db');
const modelIdeas = 'ideas';
//initialize db
const ideas = db.getAllFromDatabase(modelIdeas);

ideaRouter.get("/", (req, res, next) => {
    res.send(db.getAllFromDatabase(modelIdeas));
});

ideaRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const newIdea = req.body;
    if(!newIdea){ //no json body included
        res.status(400).send();
    } else {
        db.addToDatabase(modelIdeas, newIdea);
        res.status(201).send(newIdea);
    }
});

//validate ideaId
ideaRouter.param( "ideaId", (req, res, next, id) => {
    const getIdea = ideas[id];
    if(getIdea) {
        next()
    } else {
        res.status(404).send();
    }
});

ideaRouter.get(`/:ideaId`, (req, res, next) => {
    const reqMinion = db.getFromDatabaseById(modelIdeas, req.params.ideaId);
    res.send(reqMinion);
});

ideaRouter.put(`/:ideaId`, (req, res, next) => {
    if(req.is('json'))
    {
        const upMinion = db.updateInstanceInDatabase(modelIdeas, req.body );
        res.send(upMinion);
    } else {
        res.status(400).send();
    }
});

ideaRouter.delete(`/:ideaId`, (req, res, next) => {
    const isDeleted = db.deleteFromDatabasebyId(modelIdeas, req.params.ideaId);
    if(isDeleted) {res.status(204).send()};
    
});

module.exports = ideaRouter;