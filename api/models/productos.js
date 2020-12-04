const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    IDPRODUCTO: {type: Number, require: true},
    NOMBREPRODUCTO: {type: String, require: true},
    PRECIO: {type: Number, require: true},
    IDSUCURSAL: {type: Number, require: true},
    IDCATEGORIA: {type: Number, require: true},
    IDPROVEEDOR: {type: Number, require: true}

})

module.exports = mongoose.model('Producto', ProductoSchema, 'Producto');