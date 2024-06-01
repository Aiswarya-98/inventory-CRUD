const express = require('express')
const router = new express.Router()
const productController = require('../Controller/productController')
const multerConfig = require('../Middleware/multerMiddleware')

// route to additem

router.post('/product/add',multerConfig.single("productImage"), productController.addItem)

// route to get all products

router.get('/products/get/all',productController.getAllProducts)

// route to edit product

router.put('/product/edit/:id',multerConfig.single("productImage"),productController.editProduct)


// route to delete product
router.delete('/product/remove/:id',productController.deleteProduct)

module.exports = router