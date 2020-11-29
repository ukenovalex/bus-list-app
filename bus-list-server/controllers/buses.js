const Bus = require('../models/Bus')
const errorHandler = require('../utils/errorHandler')

module.exports.setBus = async function(req, res) {
    try {
        await Bus.find().remove()
        // for(let i = 0; i < req.body.length; i++) {
        //     await new Bus({
        //         busName: req.body[i].busName,
        //         countPlace: req.body[i].countPlace
        //     }).save()
        // }
        req.body.forEach(async bus => {
            await new Bus({
                busName: bus.busName,
                countPlace: bus.countPlace
            }).save()
        })
        res.status(201).json({
            message: 'Bus is added'
        })
    } catch (e) {
        errorHandler(req, e)
    }
}

module.exports.getBus = async function(req, res) {
    try {
        const buses = await Bus.find()
        res.status(200).json(buses)
    } catch (e) {
        errorHandler(res, e)
    }
}