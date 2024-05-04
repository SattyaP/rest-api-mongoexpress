import express from "express";
import ProductController from "../controllers/productController.js";

const product = new ProductController();
const router = express.Router();

router.get('/', async (req, res) => await product.index(req, res));
router.post('/', async (req, res) => await product.store(req, res));
router.get('/:slug', async (req, res) => await product.show(req, res));
router.put('/:slug', async (req, res) => await product.update(req, res));
router.delete('/:slug', async (req, res) => await product.destroy(req, res));

export default router;