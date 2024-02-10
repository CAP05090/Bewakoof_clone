const mongoose = require("mongoose")

const trendingSchema = mongoose.Schema({
    category: {type: String, required: true},
    poster: {type: String, required: true}
}, {
    versionKey: false
})

const TrendingModel = mongoose.model("trending", trendingSchema)

module.exports = {TrendingModel}