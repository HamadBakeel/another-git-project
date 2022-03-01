const mongoose = require('mongoose');
// import {mongoose} from 'mongoose'

const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true
    },
    percentage:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: true
    },
    dateCreated:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Skill', skillSchema)