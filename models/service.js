const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    servedClients:{
        type: Number,
        default: 0
    },
    serviceDescription:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Service', serviceSchema)