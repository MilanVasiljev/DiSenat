const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const FriendSchema = new Schema({

            requester: {
                type: String,
                required: true
            },
            recipient: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true,
                default: 'pending'
            }
});

module.exports = Friend = mongoose.model('friend', FriendSchema);


