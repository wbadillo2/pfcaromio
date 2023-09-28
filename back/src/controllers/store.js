const { Store } = require('../db');

// Obtener todas las tiendas de la base de datos
const getStores = async () => {
    try {
        return await Store.find();
    } catch (err) {
        console.log(err);
    }
};

// Obtener una tienda por su ID o por su nombre
const getStoreByIdOrName = async (identifier) => {
    try {
        let store;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            store = await Store.findById(identifier)
                .populate('reviews')
                .populate('products');
        } else {
            store = await Store.findOne({ name: identifier })
                .populate('reviews')
                .populate('products');
        }
        return store;
    } catch (err) {
        console.log(err);
    }
};

// Crear una nueva tienda
const createStore = async (name, products, solds, revenue, rating) => {
    try {
        const newStore = new Store({
            name: name,
            products: products,
            solds: solds,
            revenue: revenue,
            rating: rating,
        });
        
        await newStore.save();
        return newStore;

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getStores,
    getStoreByIdOrName,
    createStore
};