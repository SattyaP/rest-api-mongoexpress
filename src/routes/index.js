import express from "express";
import ProductController from "../controllers/productController.js";

const product = new ProductController();
const router = express.Router();

router.get('/', async (_req, res) => product.index(_req, res));

router.post('/', async (req, res) => product.store(req, res));

export default router;