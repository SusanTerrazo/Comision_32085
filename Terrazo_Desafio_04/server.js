const express = require('express')
const morgan = require('morgan')

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))


const routerProductos = require('./src/routes/productos.router')

app.use('/api/productos', routerProductos)




const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT} `);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})