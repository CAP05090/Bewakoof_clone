const { TopModel } = require("../models/topModel")

const topRouter = require("express").Router()

// YAML
/**
 * @swagger
 *  components:
 *      schemas: 
 *          Top_Pic:
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
 *      name: Top Pic
 *      description: All the API routes to Best Pic.
 */

// Get Data
/**
 * @swagger
 *  /toppic:
 *      get:
 *          summary: Get all the Top pic Data.
 *          tags: [Top Pic]
 *          async: true
 *          parameters: 
 *              - in: query
 *                name: category
 *                schema:
 *                  type: string
 *                required: false
 *                description: Category of the results.
 *          responses:
 *              '200':
 *                  description: The list of all Top pic data.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Top_Pic"
 *                          example:
 *                              TopPic: 
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

topRouter.get("/", async(req, res)=>{
    let q = req.query
    try {
        let data = await TopModel.find({q})
        res.status(200).send({"Top Data": data})
    } catch (error) {
        res.status(500).send({"err": error.message})
    }
})

// Add new data
/**
 * @swagger
 *  /toppic/add:
 *      post:
 *          summary: Added a new top pic data to DB.
 *          tags: [Top Pic]
 *          async: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/Top_Pic"
 *          responses:
 *              '200':
 *                  description: The new Top Pic data has been Added.
 *              '400':
 *                  description: Bad request or Something Wrong.
 */

topRouter.post("/add", async(req, res)=>{
    try {
        const data = new TopModel(req.body)
        await data.save()
        res.status(200).send({"msg": "New top data added to DB.", "data": data})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Update data
/**
 * @swagger
 *  /toppic/update/{id}:
 *      patch: 
 *          summary: Update the details of the specific Top Pic.
 *          tags: [Top Pic]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Top pic.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Top_Pic"
 *          responses:
 *              '200':
 *                  description: TopPic has been updated successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Toptpic has been updated successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

topRouter.patch("/update/:id", async(req, res)=>{
    const id = req.params
    try {
        await TopModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`top data id ${id} has been updated `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Delete data
/**
 * @swagger
 *  /toppic/delete/{id}:
 *      delete: 
 *          summary: delete a specific Top Pic.
 *          tags: [Top Pic]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Top pic.
 *          responses:
 *              '200':
 *                  description: TopPic has been deleted successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Toppic has been deleted successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

topRouter.delete("/delete/:id", async(req, res)=>{
    const id = req.params
    try {
        await TopModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`top data id ${id} has been Deleted `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = {topRouter}