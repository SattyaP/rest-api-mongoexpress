import express from "express";
import ProductController from "../controllers/productController.js";

const product = new ProductController();
const router = express.Router();

router.get('/', (_req, res) => product.index(_req, res));
router.post('/', (req, res) => product.store(req, res));
router.get('/:slug', (req, res) => product.show(req, res));
router.put('/:slug', (req, res) => product.update(req, res));
router.delete('/:slug', (req, res) => product.destroy(req, res));

export default router;