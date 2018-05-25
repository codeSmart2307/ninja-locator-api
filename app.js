// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import Routes
const routes = require('./routes/api');

// Initialize Express App
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

/***********************************************************/
/*BEGIN MIDDLEWARE*/
/***********************************************************/

// Use Static Assets
app.use(express.static('public'));

// Use Body Parser Middleware
app.use(bodyParser.json());

// Use imported routes
app.use('/api', routes);

// Use Error Handling Middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(422).send({error: err.message});
});

/***********************************************************/
/*END MIDDLEWARE*/
/***********************************************************/

// Server runs on port 3000
app.listen(process.env.port || 4000, () => {
    console.log('App listening on port 3000');
});

