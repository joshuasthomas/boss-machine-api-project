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
});

//validate ideaId
ideaRouter.param( "ideaId", (req, res, next, id) => {
    const getIdea = ideas[id];
    if(getIdea) {
        req.ideaId = id;
        next()
    } else {
        res.status(404);
    }
});

ideaRouter.get(`/:ideaId`, (req, res, next) => {
    const id = req.ideaId;
    console.log('test getting one');
    const reqMinion = db.getFromDatabaseById(modelIdeas, id);
    res.send(reqMinion);
});

ideaRouter.put(`/:ideaId`, (req, res, next) => {
    const id = req.ideaId;
    const upMinion = db.updateInstanceInDatabase(modelIdeas, ideas[id] );
    res.send(upMinion);
});

ideaRouter.delete(`/:ideaId`, (req, res, next) => {
    const id = req.ideaId;
    const isDeleted = db.deleteFromDatabasebyId(modelIdeas, id);
    if(isDeleted) {res.status(204)};
    
});

module.exports = ideaRouter;