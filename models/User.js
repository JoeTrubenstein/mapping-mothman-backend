const mongoose = require('mongoose');
const moment = require('moment');

let UserSchema = new mongoose.Schema({
    isFacebook: {type: Boolean, default: false},
    facebookID: { type: String, default: '' },
    facebookPicture: {type: Object, default: {}},
    email: { type: String, lowercase: true },
    password: { type: String, default: '' },
    profile: { type: Object, default: {}},
    isAdmin: {type: Boolean, default: false},
    timestamp: { type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}
})

module.exports = mongoose.model('user', UserSchema);