const express = require('express')
const routerProductos = express.Router();
const Producto = require('./clase.productos.js')


//const DB_PRODUCTOS = []

routerProductos.get('/',(req, res)=>{
    res.status(200).send(Producto.productos)
})

routerProductos.get('/:id', (req, res)=>{
    try {
        const id = req.params.id;

        const indexObj = Producto.productos.findIndex((o)=>o.id == id)
        if (indexObj == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        }

        res.status(200).send(Producto.productos[indexObj])

    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`})
    }

    
})

routerProductos.post('/', (req, res)=>{
   try {
     console.log(req.body);
     const objs = Producto.productos
     let newId;
     if (objs.length == 0) {
         newId = 1
     } else {
         newId = objs[objs.length-1].id + 1
     }

    const newObj = { id: newId, ...req.body}
    objs.push(newObj)
    res.status(200).json({msg: `Producto agregado con ID: ${newId}`})
 
   } catch (error) {
    console.log(error)
    res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`})
   }
    
})

routerProductos.put('/:id', (req, res)=>{
    try {
        const id = req.params.id;
       
        const indexObj = Producto.productos.findIndex((o)=>o.id == id)
        if (indexObj == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        }

    Producto.productos[indexObj] = {id: id, ...req.body} 

    res.status(200).json({msg: 'Producto actualizado'})
        
       

    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`})
    }

})

routerProductos.delete('/:id', (req, res)=>{
    try {
        const id = req.params.id;
       

        const indexObj = Producto.productos.findIndex((o)=>o.id == id)
        if (indexObj == -1) {
            res.status(404).json({code: 404, msg: `Producto ${id} no encontrado`})
        }

        Producto.productos.splice(indexObj, 1)

        res.status(200).json({msg: 'Producto eliminado'})

    } catch (error) {
        console.log(error)
        res.status(500).json({code: 500, msg: `Error al obtener ${req.method} ${req.url}`})
    }

})

module.exports = routerProductos;