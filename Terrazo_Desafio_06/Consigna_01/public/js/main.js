const socket = io();
const $tableProducts = document.querySelector('#tablaProducto');

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

