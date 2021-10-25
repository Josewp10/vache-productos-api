const {ProductosDAO} = require('../DAO/productos'); 
const _productosDAO = new ProductosDAO;



class ProductosController {


 
   validarProducto(producto){
    if (!producto){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del producto'
        };
    }else if(!producto.codigo){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del producto'
        };
    }
};

   async consultarProductos(){
    let resp = await _productosDAO.consultarProductos();
    return resp.rows;
      
    }

    async consultarProducto(codigo){

        let resp = await _productosDAO.consultarProducto(codigo);

        switch (resp.rowCount ) {
            
            case 0:
                
               throw 'Elemento no encontrado';

            case 1:
                return resp.rows;

        }

    }

   
    async guardarProducto(producto){
        await _productosDAO.guardarProducto(producto);
    }
  
    

    async editarProducto(producto,codigo){
        if (producto.codigo != codigo) {
            throw {
              ok: false,
              mensaje: "codigo del producto  no corresponde al enviado",
            };
          }
         await _productosDAO.editarProducto(producto);
    }


    async eliminarProducto(producto){
        return _productosDAO.eliminarProducto(producto);
    }
  
}
module.exports={ProductosController}