const mongoose = require('mongoose');
const moment = require('moment');

let SightingSchema = new mongoose.Schema({
    witness: { type: String, default: '' },
    seenDate: { type: String, default: '' },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    isApproved: { type: Boolean, default: false },
    submitDate: { type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')},
})

module.exports = mongoose.model('sighting', SightingSchema);