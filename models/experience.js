const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    experienceName: {
        type: String,
        required: true
    },
    experienceDescription:{
        type: String,
        required: false
    },
    idDeleted: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Experience', experienceSchema);