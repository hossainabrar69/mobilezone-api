const ProductModel = require('../models/product.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Product Controller
 ******************************************************************************/
class ProductController {
    getAllProducts = async (req, res, next) => {
        let ProductList = await ProductModel.find();
        if (!ProductList.length) {
            throw new HttpException(404, 'Products not found');
        }
        res.send(ProductList);
    };

    getProductById = async (req, res, next) => {
        const Product = await ProductModel.findOne({ id: req.params.id });
        if (!Product) {
            throw new HttpException(404, 'Product not found');
        }
        res.send(Product);
    };

    /**
     * 
     {
	"product_id" : 11,
	"product_name": "Poco C3",
	"details":"",
	"image":"",
	"model":"C3",
	"brand" : "Poco"
     }
     */
    createProduct = async (req, res, next) => {
        try {
            const result = await ProductModel.create(req.body);
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
            res.status(201).send('Product was created!');  
        } catch (error) {
            console.log(error,req.body)   
        }
       
    };

    updateProduct = async (req, res, next) => {
       
        const result = await ProductModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Product not found' :
            affectedRows && changedRows ? 'Product updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteProduct = async (req, res, next) => {
        const result = await ProductModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Product not found');
        }
        res.send('Product has been deleted');
    };

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProductController;