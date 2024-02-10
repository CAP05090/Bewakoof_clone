const monoose = require("mongoose")

const blackListSchema = monoose.Schema({
    token:{type: String, required: true},
    date: {type: String, required: true}
}, {
    versionKey: false
})

const BlackListModel = ("BlackListToken", blackListSchema)

module.exports = {BlackListModel}