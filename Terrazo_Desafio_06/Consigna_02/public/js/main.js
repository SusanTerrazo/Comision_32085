const socket = io();
const $tableProducts = document.querySelector('#tablaProducto');
const $inputUser = document.querySelector('#user');
const $inputContenido = document.querySelector('#contenidoMensaje');
const $date = new Date().toLocaleDateString();

socket.on('from-update-products', productos =>{
    render(productos)
          
})

function render (producto){
    
    if (producto.length > 0) $tableProducts.innerHTML = '',
    producto.forEach(product => {
        $tableProducts.innerHTML +=

        ` <tr>
            <td>${product.producto}</td>
            <td>${product.precio}</td>
            <td>
                <img width="30" src="${product.imagen}" alt="${product.producto}">
            </td>
        </tr>`;
    });  
}

/*----------------------------- chat --------------------*/
socket.on('from-server-mensaje', mensajes =>{
    render2(mensajes)
    
})

function render2(mensajes){
    const cuerpoMensajesHTML = mensajes.map((msj)=>{
        return `<span><b>${msj.author}</b></span><span style="color:green;">${msj.date}</span><span> ${msj.text}</span>`
    }).join('<br>')
    document.querySelector('#mensajes').innerHTML = cuerpoMensajesHTML
}

function enviarMensaje(){
    const mensaje = {
        author: $inputUser.value,
        date: $date,
        text: $inputContenido.value 
    }

    socket.emit('from-client-mensaje', mensaje)
}