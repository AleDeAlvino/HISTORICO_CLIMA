const express = require('express');
// const productos = require('../models/productos');
const router = express.Router();

const Producto = require('../models/productos');

router.get('/', async (req, res) => {
        const productos = await Producto.find();
        res.json(productos);
        res.send("hello")
    });

router.get('/:id', async (req, res) => {
        const producto = await Producto.findById(req.params.id);
        res.json(producto);
    });

router.post('/', async (req, res) => {
    const { IDPRODUCTO, NOMBREPRODUCTO, PRECIO, IDSUCURSAL, IDCATEGORIA, IDPROVEEDOR} = req.body;
    const producto = new Producto({ IDPRODUCTO, NOMBREPRODUCTO, PRECIO, IDSUCURSAL, IDCATEGORIA, IDPROVEEDOR});
    console.log(producto);
    await producto.save();
    res.json({status: 'producto guardado'});
});

router.put('/:id', async(req, res) => {
    const { IDPRODUCTO, NOMBREPRODUCTO, PRECIO, IDSUCURSAL, IDCATEGORIA, IDPROVEEDOR} = req.body;
    const nuevo_producto = { IDPRODUCTO, NOMBREPRODUCTO, PRECIO, IDSUCURSAL, IDCATEGORIA, IDPROVEEDOR};
    await Producto.findByIdAndUpdate(req.params.id, nuevo_producto, {
        useFindAndModify: false
    });
    res.json({status: 'Producto actualizado'});
});

router.delete('/:id', async(req, res) => {

    await Producto.findByIdAndRemove(req.params.id);
    res.json({status: 'Producto Eliminado'});
});

module.exports = router;