const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Geolocation Schema
const geoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// Create Ninja Schema
const ninjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String,
        required: [true, 'Rank field is required']
    },
    available: {
        type: Boolean,
        default: false        
    },
    // Add in geo-location
    geometry: geoSchema
});

// Create Ninja Model
const Ninja = mongoose.model('ninja', ninjaSchema); 

module.exports = Ninja;