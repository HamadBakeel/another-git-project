const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 15,
        default: "Demo first Name"
    },

    lastName: {
        type: String,
        required: true,
        max: 15,
        default: "Demo last Name"
    },
    Address: {
        country: {
            type: String,
            default: 'A Country'
        },
        street: {
            type: String,
            default: 'A street'
        },
        city: {
            type: String,
            default: 'A City'
        },
    },
    phoneNumbers: {
        work: {
            type: Number,
            default: 123456789
        },
        
        home: {
            type: Number,
            default: 123456789
        },
        
    },
    jobTitle: {
        type: String,
        default: 'Demo Job Title'
    },
    profileImage:{
        type: String,
        default: "https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg"
    }

});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);