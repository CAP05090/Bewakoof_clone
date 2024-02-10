const mongoose = require("mongoose")

const customSchema = mongoose.Schema({
    category: {type: String, required: true},
    poster: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    rating: Number
}, {
    versionKey: false
})

const CustomModel = mongoose.model("custom", customSchema)

module.exports = {CustomModel}