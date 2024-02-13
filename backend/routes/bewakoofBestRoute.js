const {BewakoofBestModel} = require("../models/bewakoofBestModel")

const bewakoofbestRouter = require("express").Router()

// YAML
/**
 * @swagger
 *  components:
 *      schemas: 
 *          Bewakoof_Best:
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
 *      name: Bewakoof Best
 *      description: All the API routes to Missed Hot.
 */

/**
 * @swagger
 *  /bewakoofbest:
 *      get:
 *          async: true
 *          summary: Get all the Bewakoof Best Data sorted with a category.
 *          tags: [Bewakoof Best]
 *          parameters: 
 *              - in: query
 *                name: category
 *                schema:
 *                  type: string
 *                required: false
 *                description: Category of the results.
 *          responses:
 *              '200':
 *                  description: The list of all Bewakoof Best data.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Bewakoof_Best"
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
bewakoofbestRouter.get("/", async(req, res)=>{
    try {
        let data = await BewakoofBestModel.find()
        res.status(200).send({"Bewakoof Best": data})
    } catch (error) {
        res.status(500).send({"err": error.message})
    }
})

/**
 * @swagger
 *  /bewakoofbest/add:
 *      post:
 *          summary: Added a new Bewakoof Best data to DB.
 *          tags: [Bewakoof Best]
 *          async: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/Bewakoof_Best"
 *          responses:
 *              '200':
 *                  description: The new Bewakoof Best data hasbeen Added.
 *              '400':
 *                  description: Bad request or Something Wrong.
 */
// Add new data
bewakoofbestRouter.post("/add", async(req, res)=>{
    try {
        const data = new BewakoofBestModel(req.body)
        await data.save()
        res.status(200).send({"msg": "New Bewakoof Best data added to DB.", "data": data})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Update data
/**
 * @swagger
 *  /bewakoofbest/update/{id}:
 *      patch: 
 *          summary: Update the details of the specific Bewakoof Best data.
 *          tags: [Bewakoof Best]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Bewakoof Best data.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Bewakoof_Best"
 *          responses:
 *              '200':
 *                  description: Bewakoof Best data has been updated successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Bewakoof Best data has been updated successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

bewakoofbestRouter.patch("/update/:id", async(req, res)=>{
    const id = req.params
    try {
        await BewakoofBestModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`Bewakoof Best data id ${id} has been updated `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Delete data
/**
 * @swagger
 *  /bewakoofbest/delete/{id}:
 *      delete: 
 *          summary: delete a specific Bewakoof Best data.
 *          tags: [Bewakoof Best]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Bewakoof Best.
 *          responses:
 *              '200':
 *                  description: Bewakoof Best has been deleted successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Bewakoof Best has been deleted successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

bewakoofbestRouter.delete("/delete/:id", async(req, res)=>{
    const id = req.params
    try {
        await BewakoofBestModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Bewakoof Best data id ${id} has been Deleted `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = {bewakoofbestRouter}