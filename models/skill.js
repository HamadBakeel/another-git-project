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
    }
})

module.exports = mongoose.model('Skill', skillSchema)