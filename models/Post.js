const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create post schema
const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    avatar: {
        type: String
    },
    handle: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            firstname: {
                type: String
            },
            lastname: {
                type: String
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
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Post = mongoose.model('post', PostSchema);