const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const VipCardSchema = new Schema({

    userid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    handle: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = VipCardRequest = mongoose.model('vipcard', VipCardSchema);


