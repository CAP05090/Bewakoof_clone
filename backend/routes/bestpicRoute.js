const { BestPicModel } = require("../models/bestpicModel")

const picRouter = require("express").Router()

// YAML
/**
 * @swagger
 *  components:
 *      schemas: 
 *          Best_Pic:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Unique id generated by MongoDB.
 *                  poster:
 *                      type: string
 *                      description: The URL of the poster image for the best pic.
 */

/**
 * @swagger
 *  tags:
 *      name: Best Pic
 *      description: All the API routes to Best Pic.
 */

// Get Data
/**
 * @swagger
 *  /bestpic:
 *      get:
 *          async: true
 *          summary: Get all the best pic Data sorted with a category.
 *          tags: [Best Pic]
 *          parameters: 
 *              - in: query
 *                name: category
 *                schema:
 *                  type: string
 *                required: false
 *                description: Category of the results.
 *          responses:
 *              '200':
 *                  description: The list of all Best pic data.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Best_Pic"
 *                          example:
 *                              BestPic: 
 *                                  - id: "1"
 *                                    poster: "https://shop.bewakoof.com/cdn......"
 *              '500':
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          example:
 *                              error: "Error message indicating the issue"
 */
picRouter.get("/", async(req, res)=>{
    try {
        let data = await BestPicModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({"err": error.message})
    }
})

// Add new data
/**
 * @swagger
 *  /bestpic/add:
 *      post:
 *          summary: Added a new best pic data to DB.
 *          tags: [Best Pic]
 *          async: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/Best_Pic"
 *          responses:
 *              '200':
 *                  description: The new Best Pic data hasbeen Added.
 *              '400':
 *                  description: Bad request or Something Wrong.
 */

picRouter.post("/add", async(req, res)=>{
    try {
        const data = new BestPicModel(req.body)
        await data.save()
        res.status(200).send({"msg": "New best pic data added to DB.", "data": data})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Update data
/**
 * @swagger
 *  /bestpic/update/{id}:
 *      patch: 
 *          summary: Update the details of the specific Best Pic.
 *          tags: [Best Pic]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Bestpic.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Best_Pic"
 *          responses:
 *              '200':
 *                  description: BestPic has been updated successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Bestpic has been updated successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

picRouter.patch("/update/:id", async(req, res)=>{
    const id = req.params
    try {
        await BestPicModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`best pic id ${id} has been updated `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Delete data
/**
 * @swagger
 *  /bestpic/delete/{id}:
 *      delete: 
 *          summary: delete a specific Best Pic.
 *          tags: [Best Pic]
 *          async: true
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Bestpic.
 *          responses:
 *              '200':
 *                  description: BestPic has been deleted successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Bestpic has been deleted successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

picRouter.delete("/delete/:id", async(req, res)=>{
    const id = req.params
    try {
        await BestPicModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`best pic id ${id} has been Deleted `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = {picRouter}
