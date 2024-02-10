const mongoose = require("mongoose")

const missedSchema = mongoose.Schema({
    category: {type: String, required: true},
    poster: {type: String, required: true}
}, {
    versionKey: false
})

const MissedModel = mongoose.model("missedhot", missedSchema)

module.exports = {MissedModel}