const mongoose = require("mongoose")

const bewakoofBestSchema = mongoose.Schema({
    category: {type: String, required: true},
    poster: {type: String, required: true}
}, {
    versionKey: false
})

const BewakoofBestModel = mongoose.model("bewakoofBest", bewakoofBestSchema)

module.exports = {BewakoofBestModel}