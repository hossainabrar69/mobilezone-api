const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', auth(), awaitHandlerFactory(productController.getAllProducts)); // localhost:3000/api/v1/products
router.get('/id/:id', auth(), awaitHandlerFactory(productController.getProductById)); // localhost:3000/api/v1/products/id/1
router.post('/', awaitHandlerFactory(productController.createProduct)); // localhost:3000/api/v1/products
router.patch('/id/:id', auth(Role.Admin), awaitHandlerFactory(productController.updateProduct)); // localhost:3000/api/v1/products/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(productController.deleteProduct)); // localhost:3000/api/v1/products/id/1
router.post('/upload', auth(), awaitHandlerFactory(productController.uploadImage)); // localhost:3000/api/v1/products/upload

module.exports = router;