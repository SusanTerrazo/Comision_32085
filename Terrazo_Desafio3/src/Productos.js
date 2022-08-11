const fs = require('fs/promises')

class Productos {
    constructor (ruta){
        this.ruta = ruta
    }

    async save(obj){
      try {
        
        const objs = await this.getAll();
        
        let newId;
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length -1].id + 1
        
        }
        
        const newObj = {id: newId, ...obj}
        objs.push(newObj);

        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        return newId;

      } catch (error) {
        return console.log('existe un error')
      }
    }
    
    async getById(id){
        try {
            
            const objs = await this.getAll();
            const indexObj = objs.findIndex((o)=>o.id == id)

            if (indexObj == -1) {
                return 'Objeto no encontrado'
            } else {
                
                return objs[indexObj];
            }

        } catch (error) {
            
        }
    }


    async getAll(){
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')          
            return JSON.parse(objs)
        } catch (error) {
            return[]
        }
    }

    async deleteById(id){
        try {
            
            const objs = await this.getAll();
            const indexObj = objs.findIndex((o)=>o.id == id)

            if (indexObj == -1) {
                return 'Objeto no encontrado'
            } else {
                
                objs.splice(indexObj, 1);
                await fs.writeFile(this.ruta, JSON.stringify(objs,null,2));
                return 'Objeto eliminado'
            }

        } catch (error) {
            return 'No se pudo eliminar el objeto'
        }
    }

    async deleteAll(){
        try {
            await fs.unlink(this.ruta,error =>{
                if (error) {
                    return 'Hubo un error al borrar'
                } else {
                    console.log('Archivo borrado')
                }
            })
        } catch (error) {
            return 'error'
        }
    }

}



module.exports = Productos