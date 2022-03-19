const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    
    if(!numWeeks || !weeklyRevenue) {
        res.status(400).send();
    } 

    const totalRevenue = numWeeks * weeklyRevenue;
    if(totalRevenue >= 1000000) {
        next();
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
