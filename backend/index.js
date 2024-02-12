const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/userRoute")
const {limiter} = require("./middlewares/Limiter.middleware")
const {checkURL} = require("./middlewares/checkURL.middleware")
const { picRouter } = require("./routes/bestpicRoute")
const { missedRouter } = require("./routes/missedRoute")
const { topRouter } = require("./routes/topRoute")
const { trendRouter } = require("./routes/trendingRoute")
const { overSizedRouter } = require("./routes/oversizeRoute")
const { bewakoofbestRouter } = require("./routes/bewakoofBestRoute")
const { customRouter } = require("./routes/customRoute")

const app = express()
const PORT = process.env.PORT

app.use(limiter)
app.use(cors({origin: "*"}))
app.use(express.json())
app.use(checkURL)

// Routes
app.use("/users", userRouter)
app.use("/bestpic", picRouter)
app.use("/missedhot", missedRouter)
app.use("/toppic", topRouter)
app.use("/trending", trendRouter)
app.use("/oversize", overSizedRouter)
app.use("/bewakoofbest", bewakoofbestRouter)
app.use("/custom", customRouter)

// Swagger Docs
const options = {
    definition:{
        openapi: "3.0.0",
        info:{ title: "Bewakoof Shopping Docs", version: "1.0.0"},
        servers:[{ url:"http://localhost:8080" }]
    },
    apis: ["./routes/*js"]
}

//Open API Specs
const openAPIspecs = swaggerjsdoc(options)
// Build Swagger docs 
app.use("/docs", swaggerui.serve, swaggerui.setup(openAPIspecs))

//Home Page
app.get("/", async(req, res)=>{
    res.status(200).send({"msg":"Welcome"})
})

app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on port ${PORT} DB is also connected`)
    } catch (error) {
        console.log(error)
    }
})