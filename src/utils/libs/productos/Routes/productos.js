const express = require('express');
const { ProductosController } = require('../controllers/productos');
const {success, errorResponse} = require('../../../responses');

const router = express.Router();
const _productosController = new ProductosController;


 router.get('/productos', async (req, res) => {
    try {
       let resp = await _productosController.consultarProductos();
        success(req, res, 'Productos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

 

 router.get('/productos/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
   
   
    try {
       let resp = await _productosController.consultarProducto(codigo);
        success(req, res, 'productos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});




router.post('/productos', async (req, res) => {
    try {
      let productos = req.body;
  
      await _productosController.guardarProducto(productos);
      success(req, res, 'Cliente creado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  });

  router.delete('/productos/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    try {
      await _productosController.eliminarProducto(codigo);
      success(req, res, 'Cliente eliminado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  
  });
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
 