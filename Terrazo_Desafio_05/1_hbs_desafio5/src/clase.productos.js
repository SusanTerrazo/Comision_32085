class Producto {
    constructor(id, producto, precio, imagen){
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.imagen = imagen
    }

    static productos = [];
}

module.exports = Producto;