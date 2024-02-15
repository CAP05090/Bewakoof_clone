const {TrendingModel} = require("../models/trendingModel")

const trendRouter = require("express").Router()
// YAML
/**
 * @swagger
 *  components:
 *      schemas: 
 *          Trending:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Unique id generated by MongoDB.
 *                  category:
 *                      type: string
 *                      description: Category of the poster (men, women, accessories, winterwear, etc)
 *                  poster:
 *                      type: string
 *                      description: The URL of the poster image for the best pic.
 */

/**
 * @swagger
 *  tags:
 *      name: Trending
 *      description: All the API routes to Trending.
 */

// Get Data
/**
 * @swagger
 *  /trending:
 *      get:
 *          async: true
 *          summary: Get all the trending Data sorted with a category.
 *          tags: [Trending]
 *          parameters: 
 *              - in: query
 *                name: category
 *                schema:
 *                  type: string
 *                required: false
 *                description: Category of the results.
 *          responses:
 *              '200':
 *                  description: The list of all Trending data.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Trending"
 *                          example:
 *                              Trending: 
 *                                  - id: "1"
 *                                    category: "men, women, wenterwear, etc."
 *                                    poster: "https://shop.bewakoof.com/cdn......"
 *              '500':
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          example:
 *                              error: "Error message indicating the issue"
 */
trendRouter.get("/", async(req, res)=>{
    try {
        let data = await TrendingModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({"err": error.message})
    }
})

// Add new data
/**
 * @swagger
 *  /trending/add:
 *      post:
 *          summary: Added a new Trending data to DB.
 *          tags: [Trending]
 *          async: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/Trending"
 *          responses:
 *              '200':
 *                  description: The new Trending data has been Added.
 *              '400':
 *                  description: Bad request or Something Wrong.
 */
trendRouter.post("/add", async(req, res)=>{
    try {
        const data = new TrendingModel(req.body)
        await data.save()
        res.status(200).send({"msg": "New trending data added to DB.", "data": data})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Update data
/**
 * @swagger
 *  /trending/update/{id}:
 *      patch: 
 *          summary: Update the details of the specific trending data.
 *          tags: [Trending]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Trending.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Trending"
 *          responses:
 *              '200':
 *                  description: Trending data has been updated successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Trending data has been updated successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */
trendRouter.patch("/update/:id", async(req, res)=>{
    const id = req.params
    try {
        await TrendingModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`Trending data id ${id} has been updated `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Delete data
/**
 * @swagger
 *  /trending/delete/{id}:
 *      delete: 
 *          summary: delete a specific Trending data.
 *          tags: [Trending]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Trending.
 *          responses:
 *              '200':
 *                  description: Trending has been deleted successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Trending has been deleted successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */
trendRouter.delete("/delete/:id", async(req, res)=>{
    const id = req.params
    try {
        await TrendingModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Trending data id ${id} has been Deleted `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = {trendRouter}