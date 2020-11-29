const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({
    peopleName: {
        type: String,
        required: true
    },
    peopleBus: {
        type: String,
        required: true
    },
    peoplePlace: {
        type: Number,
        required: true
    },
    peopleWhere: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('people', personSchema)