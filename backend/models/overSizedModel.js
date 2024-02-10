const mongoose = require("mongoose")

const oversizeSchema = mongoose.Schema({
    category: {type: String, required: true},
    poster: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    rating: Number
}, {
    versionKey: false
})

const OverSizeModel = mongoose.model("overSized", oversizeSchema)

module.exports = {OverSizeModel}