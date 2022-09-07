/*--------------------- Modulos ------------------------*/
const express = require('express')
const path = require('path');
const exphbs = require('express-handlebars')
const Producto = require('./src/clase.productos.js');

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io');
const { productos } = require('./src/clase.productos.js');

/*--------------------- Instancia Server ------------------------*/
const app = express();

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/*--------------------- Middlewares ------------------------*/
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


/*--------------------- Motores de Plantilla ------------------------*/
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

/*--------------------- Base de datos ------------------------*/
const DB_PRODUCTOS = Producto.productos
const DB_MENSAJES = []
    



/*--------------------- Rutas ------------------------*/
app.get('/', (req, res)=>{
    res.render('vista', {DB_PRODUCTOS})
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
    // console.log(DB_PRODUCTOS);
    res.redirect('/')

    
})



/*--------------------- Servidor ------------------------*/
const PORT = 8080
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT} `);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
})

/*--------------------- Web Socket ------------------------*/
io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    io.sockets.emit('from-update-products', DB_PRODUCTOS);

    io.sockets.emit('from-server-mensaje', DB_MENSAJES);

    socket.on('from-client-mensaje', mensaje =>{
        DB_MENSAJES.push(mensaje)
        io.sockets.emit('from-server-mensaje', DB_MENSAJES)
    })

    
})