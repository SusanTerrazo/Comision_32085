const express = require('express');
const Productos = require('./src/Productos.js')

const app = express();


async function main(){
    const prod = new Productos('./src/DB/productos.txt')
    let producto = await prod.getAll()
    let productoRandom = await prod.getById(1)

    app.get('/productos', (req, res)=>{
        res.send(producto)
    })

    app.get('/productoRandom',(req, res)=>{
        res.send(productoRandom)
    })
}

app.get('/',(req, res)=>{
    res.send('Bienvenidos a la plataforma de Productos')
})

main()

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en http://localhost:${PORT} `)
})