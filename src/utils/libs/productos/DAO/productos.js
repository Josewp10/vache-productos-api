const config = require('config');
const database = config.get('DB');
const ServicePg = require('../../../../database/postgress');
const _servicio = new ServicePg(database);


class ProductosDAO {


async consultarProductos()  {    
    let sql = `SELECT "Id_producto", codigo, nombre, unidades, detalle
	FROM public."Producto";`;
    let respuesta = await _servicio.ejecutarSQL(sql);
    return respuesta
};



async consultarProducto(codigo){   
    let sql = `SELECT "Id_producto", codigo, nombre, unidades, detalle
	FROM public."Producto"; where codigo=$1 ;`;
      
    let respuesta = await _servicio.ejecutarSQL(sql, [codigo]);
    return respuesta;
  };
  

async guardarProducto(producto) {
    let sql = `INSERT INTO public."Producto"(
        "Id_producto", codigo, nombre, unidades, detalle)
        VALUES ($1, $2, $3, $4, $5);`;
    let valores = [producto.Id_producto, producto.codigo, producto.nombre, producto.unidades,producto.detalle];
    let respuesta = await _servicio.ejecutarSQL(sql, valores);
    return respuesta
};

 async eliminarProducto(codigo) {
    let sql = `DELETE FROM public."Producto"
	WHERE codigo=$1;`;    
    let respuesta = await _servicio.ejecutarSQL(sql, [codigo]);
    return respuesta
};
  

 async editarProducto(producto)  {
    let sql =
      `UPDATE public."Producto"
      SET "Id_producto"=$1, codigo=$2, nombre=$3, unidades=$4, detalle=$5
      WHERE codigo=$6;`;
    let valores = [producto.Id_producto, producto.codigo, producto.nombre, producto.unidades,producto.detalle];
     await _servicio.ejecutarSQLL(sql, valores);
   
  };
}
module.exports={ProductosDAO}