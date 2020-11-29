const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const busRoutes = require('./routes/buses')
const personRoutes = require('./routes/people')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Mongo is connected'))
    .catch(error => console.log(error))

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/bus', busRoutes)
app.use('/people', personRoutes)


module.exports = app