import db from '../db/connection.js';

class ProductController {
    async index(req, res) {
        const products = await db.collection('products').find({}).limit(10).toArray();
        res.send(products).status(200);
    }
}

export default ProductController;