const { MissedModel } = require("../models/missedModel")

const missedRouter = require("express").Router()

// YAML
/**
 * @swagger
 *  components:
 *      schemas: 
 *          Missed_Hot:
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
 *      name: Missed Hot
 *      description: All the API routes to Missed Hot.
 */

/**
 * @swagger
 *  /missedhot:
 *      get:
 *          async: true
 *          summary: Get all the Missed hot Data sorted with a category.
 *          tags: [Missed Hot]
 *          parameters: 
 *              - in: query
 *                name: category
 *                schema:
 *                  type: string
 *                required: false
 *                description: Category of the results.
 *          responses:
 *              '200':
 *                  description: The list of all missed hot data.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Missed_Hot"
 *                          example:
 *                              missedPic: 
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

// Get Data
missedRouter.get("/", async(req, res)=>{
    let q = req.query
    try {
        let data = await MissedModel.find({q})
        res.status(200).send({"Missed Hot": data})
    } catch (error) {
        res.status(500).send({"err": error.message})
    }
})

/**
 * @swagger
 *  /missedhot/add:
 *      post:
 *          summary: Added a new Missed hot data to DB.
 *          tags: [Missed Hot]
 *          async: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/Missed_Hot"
 *          responses:
 *              '200':
 *                  description: The new Missed hot data hasbeen Added.
 *              '400':
 *                  description: Bad request or Something Wrong.
 */
// Add new data
missedRouter.post("/add", async(req, res)=>{
    try {
        const data = new MissedModel(req.body)
        await data.save()
        res.status(200).send({"msg": "New Missed Hot data added to DB.", "data": data})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Update data
/**
 * @swagger
 *  /missedhot/update/{id}:
 *      patch: 
 *          summary: Update the details of the specific missed hot data.
 *          tags: [Missed Hot]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular missed hot.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Missed_Hot"
 *          responses:
 *              '200':
 *                  description: Missed hot data has been updated successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Missed hot data has been updated successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

missedRouter.patch("/update/:id", async(req, res)=>{
    const id = req.params
    try {
        await MissedModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`Missed Hot data id ${id} has been updated `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Delete data
/**
 * @swagger
 *  /missedhot/delete/{id}:
 *      delete: 
 *          summary: delete a specific Missed hot data.
 *          tags: [Missed Hot]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Missed Hot.
 *          responses:
 *              '200':
 *                  description: Missed hot has been deleted successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Missed hot has been deleted successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

missedRouter.delete("/delete/:id", async(req, res)=>{
    const id = req.params
    try {
        await MissedModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Missed Hot data id ${id} has been Deleted `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = {missedRouter}