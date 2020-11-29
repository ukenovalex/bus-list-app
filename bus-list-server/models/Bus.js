const mongoose = require('mongoose')
const Schema = mongoose.Schema

const busSchema = new Schema({
    dateBus: {
        type: Date,
        default: Date.now
    },
    busName: {
        type: String,
        required: true
    },
    countPlace: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('buses', busSchema)