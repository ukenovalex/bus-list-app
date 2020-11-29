const Person = require('../models/Person')
const errorHandler = require('../utils/errorHandler')
module.exports.setPeople = async function(req, res) {
    try {
        await Person.find().remove()
        req.body.forEach(async person => {
            await new Person({
                peopleName: person.peopleName,
                peopleBus: person.peopleBus,
                peoplePlace: person.peoplePlace,
                peopleWhere: person.peopleWhere
            }).save()
        })
        res.status(201).json({
            message: 'People is added'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.getPeople = async function(req, res) {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch(e) {
        errorHandler(res, e)
    }
}