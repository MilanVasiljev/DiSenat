const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const EmailSchema = new Schema({

    mailsender: {
        type: String,
        required: true
    },
    mailrecipient: {
        type: String,
        required: true
    },
    mailtitle: {
      type: String,
      default: 'Bez naslova'
    },
    mailmessage: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    handle: {
        type: String
    },
    username: {
        type: String
    },
    replies: [
        {
            replysender: {
              type: String,
              required: true
            },
            replymessage: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            handle: {
                type: String
            },
            username: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Email = mongoose.model('email', EmailSchema);


