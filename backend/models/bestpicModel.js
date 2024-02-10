const mongoose = require("mongoose")

const bestpicSchema = mongoose.Schema({
    poster: {type: String, required: true}
}, {
    versionKey: false
})

const BestPicModel = mongoose.model("bestpic", bestpicSchema)

module.exports = {BestPicModel}