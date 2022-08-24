/*--------------------- Modulos ------------------------*/
const express = require('express')
const path = require('path');
const Producto = require('./src/clase.productos.js')

/*--------------------- Instancia Server ------------------------*/
const app = express();

/*--------------------- Middlewares ------------------------*/
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))


/*--------------------- Motores de Plantilla ------------------------*/
app.set('views', './views')
app.set('view engine', 'ejs');

const DB_PRODUCTOS = Producto.productos

app.get('/', (req, res)=>{
    res.render('vista_formulario', {DB_PRODUCTOS})
})

app.get('/productos', (req, res)=>{
    res.render('vista_productos', {DB_PRODUCTOS})
})

app.post('/productos',(req, res)=>{
    
    const objs = DB_PRODUCTOS
    let newId;
    if (objs.length == 0) {
         newId = 1
    } else {
         newId = objs[objs.length-1].id + 1
    }

    const newObj = { id: newId, ...req.body}
    objs.push(newObj)
    console.log(DB_PRODUCTOS);
    res.redirect('/')
})

/*--------------------- Servidor ------------------------*/
const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT} `);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})