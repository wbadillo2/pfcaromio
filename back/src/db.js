require('dotenv').config();
var mongoose = require('mongoose');
const { MONGO_URI } = require ("../env")

async function conn() {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online'))
    .catch((e) => console.log('Error de conexion ', e));
}

module.exports = { conn };
