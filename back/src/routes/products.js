const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByIdOrName, createProduct } = require('../controllers/products');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Ruta para obtener productos por su ID o por su nombre
router.get('/:productIdOrName', async (req, res) => {
    const productIdOrName = req.params.productIdOrName;
    try {
        const products = await getProductsByIdOrName(productIdOrName);
        if (!products || products.length === 0) {
            res.status(404).json({ error: 'Products not found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, storeId, price, stock, rating } = req.body;

    try {
        const newProduct = await createProduct(name, storeId, price, stock, rating);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the product' });
    }
});

module.exports = router;
