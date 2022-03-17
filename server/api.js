const express = require('express');
const apiRouter = express.Router();

// Covers '/minions' path
apiRouter.route('/minions')
.get( (req, res, next) => {

})
.post( (req, res, next) => {
    
})
.get('/:minionid', (req, res, next) => {
    
})
.put('/:minionid', (req, res, next) => {
    
})
.delete('/:minionid', (req, res, next) => {
    
});

// Covers '/ideas' path
apiRouter.route('ideas')
.get( (req, res, next) => {

})
.post( (req, res, next) => {
    
})
.get('/:ideaid', (req, res, next) => {
    
})
.put('/:ideaid', (req, res, next) => {
    
})
.delete('/:ideaid', (req, res, next) => {
    
});

// Covers '/meetings' path
apiRouter.route('meetings')
get( (req, res, next) => {

})
.post( (req, res, next) => {
    
})
.delete( (req, res, next) => {
    
});


module.exports = apiRouter;
