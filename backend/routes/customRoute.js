const { CustomModel } = require("../models/customtshirts")
const {auth} = require("../middlewares/auth.middleware")
const customRouter = require("express").Router()
customRouter.use(auth)

// YAML
/**
 * @swagger
 *  components:
 *      schemas:
 *          CustomT_shirts:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Unique id generated by MongoDB.
 *                  category:
 *                      type: string
 *                      description: Category of the t-shirts (men, women, accessories, winterwear, etc)
 *                  title:
 *                      type: string
 *                      description: Name of the T-Shirts
 *                  description:
 *                      type: string
 *                      description: details of the T-Shirts
 *                  price:
 *                      type: number
 *                      formate: int32Array
 *                      description: Price of the T-Shirts
 *                  rating:
 *                      type: number
 *                      formate: float
 *                      description: rating given by the user.       
 */

/**
 * @swagger
 *  tags:
 *      name: Custom T-Shirts
 *      description: All the API routes to Custom T-shirts.
 */

// Get Custom T-shirts data
/**
 * @swagger
 *  /custom:
 *      get:
 *          summary: Get all the Custom T-shirts Data .
 *          tags: [Custom T-Shirts]
 *          async: true
 *          security: 
 *              - BearerAuth: []
 *          parameters: 
 *              - in: query
 *                name: category
 *                schema:
 *                  type: string
 *                required: false
 *                description: Category of the results.
 *          responses:
 *              '200':
 *                  description: The list of all Custom T-shirts.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/CustomT_shirts"
 *                          example:
 *                              CustomT_shirts: 
 *                                  - id: "1"
 *                                    category: "men, women, wenterwear, etc."
 *                                    poster: "https://shop.bewakoof.com/cdn......"
 *                                    title: "T-shirts Title"
 *                                    description: "Men's Black Ashura Graphic Printed Oversized Acid Wash T-shirt"
 *                                    price: "299"
 *                                    rating: "4.5"
 *              '500':
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          example:
 *                              error: "Error message indicating the issue"
 */

customRouter.get("/", async(req, res)=>{
    let q = req.query
    try {
        let data = await CustomModel.find({q})
        res.status(200).send({"Custom T-shirts": data})
    } catch (error) {
        res.status(500).send({"err": error.message})
    }
})

// Add a new data
/**
 * @swagger
 *  /custom/add:
 *      post:
 *          summary: Added a new Custom t-shirts to DB.
 *          tags: [Custom T-Shirts]
 *          async: true
 *          security:
 *              - BearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: "#/components/schemas/CustomT_shirts"
 *          responses:
 *              '200':
 *                  description: The new Custom t-shirt hasbeen Added.
 *              '400':
 *                  description: Bad request or Something Wrong.
 */

customRouter.post("/add", async(req, res)=>{
    try {
        const data = new CustomModel(req.body)
        await data.save()
        res.status(200).send({"msg": "New Over Sized T-shirts added to DB.", "data": data})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Update data
/**
 * @swagger
 *  /custom/update/{id}:
 *      patch: 
 *          summary: Update the details of the specific Custom t-shirts.
 *          tags: [Custom T-Shirts]
 *          async: true
 *          security:
 *              - BearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Custom t-shirts.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/CustomT_shirts"
 *          responses:
 *              '200':
 *                  description: Custom t-shirts has been updated successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Custom t-shirts has been updated successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

customRouter.patch("/update/:id", async(req, res)=>{
    const id = req.params
    try {
        await CustomModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`Over sized T-Shirt id ${id} has been updated `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

// Delete data
/**
 * @swagger
 *  /custom/delete/{id}:
 *      delete: 
 *          summary: delete a specific Custom t-shirts.
 *          tags: [Custom T-Shirts]
 *          async: true
 *          security:
 *              - BearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Unique id of a particular Custom t-shirts.
 *          responses:
 *              '200':
 *                  description: Custom t-shirts has been deleted successfully.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: "Custom t-shirts has been deleted successfully"
 *              '400':
 *                  description: Bad request or something went wrong.
 *                  content:
 *                      application/json:
 *                          example:
 *                              msg: Error message indicating the issue
 */

customRouter.delete("/delete/:id", async(req, res)=>{
    const id = req.params
    try {
        await CustomModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Over sized T-Shirt id ${id} has been Deleted `})
    } catch (error) {
        res.status(400).send({"err": error.message})
    }
})

module.exports = {customRouter}