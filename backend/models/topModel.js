const mongoose = require("mongoose")

const topSchema = mongoose.Schema({
    category: {type: String, required: true},
    poster: {type: String, required: true}
}, {
    versionKey: false
})

const TopModel = mongoose.model("top", topSchema)

module.exports = {TopModel}