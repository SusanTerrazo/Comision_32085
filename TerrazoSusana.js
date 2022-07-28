class Usuario {
    constructor(nombre, apellido, mascotas = [], libros = []) {
        
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros
        this.mascotas = mascotas
    
            
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascota(){
        return `${this.mascotas.length}`
    }

    addBook(libro){
        this.libros.push(libro);
    }
    
    getBookNames(){
        return this.libros.map(libro => `${libro.libro}`);
    }
}

const usuario1 = new Usuario('Juan','Lopez')
console.log(usuario1.getFullName())

usuario1.addMascota('perro')
console.log(usuario1.mascotas)

usuario1.countMascota()
console.log(usuario1.countMascota())

usuario1.addBook({libro : 'Orgullo y Perjuicio', autor :'Jane Austen'});
usuario1.addBook({libro : 'Quijote de la Mancha', autor :'Cervantes'});
console.log(usuario1.libros)
console.log(usuario1.getBookNames())