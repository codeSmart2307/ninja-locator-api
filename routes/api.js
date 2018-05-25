const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// Get a list of ninjas from DB
router.get('/ninjas', (req, res, next) => {
    /* Retrieve all ninjas */
    // Ninja.find({}).then((ninjas) => {
    //     res.send(ninjas);
    // });

    /* Retrieve ninjas within a 100,000m radius of the specified coordinates */
    Ninja.aggregate().near({ 
            near: { 
                'type': 'Point', 
                'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)] 
            }, 
            maxDistance: 100000, 
            spherical: true, 
            distanceField: "dis" 
    }).then((ninjas) => { 
        res.send(ninjas); 
    });   
});

// Add a new ninja to the DB
router.post('/ninjas', (req, res, next) => {
    /* Creates new ninja object and saves in DB */
    // Since the create() function is asynchronous, we add a then() function
    // which fires a callback once the new object has been created and saved
    // in the DB (When mongoose sends a promise)
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
    }).catch(next); 
    // The "next" keyword tells the server to execute the next middleware defined
    // The next middleware here is the error handling middleware
    
    /* The create() function  does exactly what the below commented code does */
    // var ninja = new Ninja({
    //     name: req.body.name,
    //     rank: req.body.rank,
    //     available: req.body.available
    // });
    // ninja.save((err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    
});

// Update a ninja in the DB
router.put('/ninjas/:id', (req, res, next) => {
    /* Updates the ninja object with the specified _id */
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Ninja.findOne({_id: req.params.id}).then((ninja) => {
            res.send(ninja);
        });        
    });
});

// Delete a ninja from the DB
router.delete('/ninjas/:id', (req, res, next) => {
    /* Deletes the ninja object with the specified _id */
    Ninja.findByIdAndRemove({_id: req.params.id}).then((ninja) => {
        res.send(ninja);
    });
});

module.exports = router; 

