const express = require('express');
const router = express.Router();
const { getStores, getStoreByIdOrName, createStore } = require('../controllers/store');

// Ruta para obtener todas las tiendas
router.get('/', async (req, res) => {
    try {
        const stores = await getStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stores' });
    }
});

// Ruta para obtener una tienda por su ID o por su nombre
router.get('/:storeIdOrName', async (req, res) => {
    const storeIdOrName = req.params.storeIdOrName;

    try {
        const store = await getStoreByIdOrName(storeIdOrName);
        if (!store) {
            res.status(404).json({ error: 'Store not found' });
        } else {
            res.status(200).json(store);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching store' });
    }
});

// Ruta para crear una nueva tienda
router.post('/', async (req, res) => {
    const { name, products, solds, revenue, rating } = req.body;

    try {
        const newStore = await createStore(name, products, solds, revenue, rating);
        res.status(201).json(newStore);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the store' });
    }
});

module.exports = router;