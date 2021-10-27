const express = require('express');
const { ProductosController } = require('../controllers/productos');
const {success, errorResponse} = require('../../../responses');

const router = express.Router();
const _productosController = new ProductosController;
/**
   * permite la vizualizacion de los productos
   *
   */

 router.get('/productos', async (req, res) => {
    try {
       let resp = await _productosController.consultarProductos();
        success(req, res, 'Productos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

  /**
   * permite la vizualizacion de uno de los productos
   *  @param codigo
   */

 router.get('/productos/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
   
   
    try {
       let resp = await _productosController.consultarProducto(codigo);
        success(req, res, 'productos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});


 /**
   * permite la insercion de los productos
   *  @param productos
   */

router.post('/productos', async (req, res) => {
    try {
      let productos = req.body;
  
      await _productosController.guardarProducto(productos);
      success(req, res, 'producto creado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  });
  /**
   * permite la eliminacion de los productos
   * @param codigo
   */

  router.delete('/productos/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    try {
      await _productosController.eliminarProducto(codigo);
      success(req, res, 'producto eliminado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  
  });
  /**
   * permite la actulizacion de los productos
   *  @param codigo
   * @param productos
   */
  router.put("/productos/:codigo", async (req, res) => {
    try {
        let codigo = req.params.codigo;
        let productos = req.body;
  
      await _productosController.editarProducto(productos,codigo);
      success(req, res, 'Producto modificado', null, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
  });

  module.exports = router;
 