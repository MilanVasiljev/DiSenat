const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const ProfileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
      type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    experience: [
        {
            title:{
                type:String,
                required: true
            },
            company: {
                type:String,
                required: true
            },
            location: {
                type:String
            },
            from: {
                type:Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    vipcard: [
        {
            firstname:{
                type:String,
                required: true
            },
            lastname:{
                type:String,
                required: true
            },
            cardname: {
                type:String,
                required: true
            },
            cardnumber: {
                type: String,
                required: true
            },
            ownerid: {
                type:String,
                required: true
            },
            handle: {
                type: String
            },
            from: {
                type:Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            }
        }
    ],
    education: [
        {
            school:{
                type:String,
                required: true
            },
            degree: {
                type:String,
                required: true
            },
            fieldofstudy: {
                type:String,
                required: true
            },
            from: {
                type:Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    article: [
        {
            title:{
                type:String,
                required: true
            },
            image: {
                type:String
            },
            articletext: {
                type:String,
                required: true
            },
            category: {
                type: String,
                required: true
            }
        },
    ],
    businessplan: [
        {
            title: {
                type: String,
                required: true
            },
            imageurl: {
                type: String,
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    ownercompany: [
        {
            name: {
                type: String,
                required: true
            },
            imageurl: {
                type: String,
                required: true
            },
            fieldofwork: {
                type: String,
                required: true
            },
            shortworkdescription: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            website: {
                type: String
            },
            handle: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    friends: [
        {
            friendId: String
        },
        {
            friendStatus: String
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);