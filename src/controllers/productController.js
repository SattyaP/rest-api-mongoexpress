import db from '../db/connection.js';
import validateSchema from '../middleware/bodyRequest.js';
import productSchema from '../models/scheme.js';
import baseController from './baseController.js';

class ProductController extends baseController {
    constructor() {
        super();
        this.code = {
            success: 200,
            badRequest: 400,
            notFound: 404,
            serverError: 500
        }
    }

    async index(req, res) {
        try {
            const products = await db.collection('products').find({}).limit(10).toArray();
            if (req.statusCode === 404) return this.sendError(res, [], "Products not found", this.code.notFound);

            return this.sendSuccess(res, products, "Products retrieved successfully", this.code.success);
        } catch (error) {
            return this.sendError(res, [], "An error occured", this.code.serverError);
        }
    }

    async store(req, res) {
        try {
            const { name, price } = req.body;
            const validate = validateSchema(productSchema, { name, price });

            if (validate) {
                return this.sendError(res, [], validate, this.code.badRequest);
            }

            const slug = name.toLowerCase().split(' ').join('-');
            const data = { name, slug, price };

            const existingProduct = await db.collection('products').findOne({ name });
            if (existingProduct) {
                return this.sendError(res, [], "Product name already taken", this.code.badRequest);
            }

            const result = await db.collection('products').insertOne(data);
            const insertedData = { _id: result.insertedId, ...data };
            
            return this.sendSuccess(res, insertedData, "Product added successfully", this.code.success);
        } catch (error) {
            return this.sendError(res, [], "An error occurred", this.code.serverError);
        }
    }
}

export default ProductController;