const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({

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
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'request' // Send request, must be role user in order to login
    },
    preporuka: {
        type: String,
        required: true
    }

});

module.exports = User = mongoose.model('users', UserSchema);