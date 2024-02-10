const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windows: 10*60*1000,  // 10 minutes
    limit: 100,   // limit eact ip to 100 requests per 10 minutes
    standardHeaders: "draft-7",  // combined `RateLimit` header
    legacyHeaders: false    // Disable the `X-RateLimit-*` headers.
})

module.exports = {limiter}