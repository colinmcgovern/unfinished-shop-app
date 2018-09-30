const express = require('express');
const router = express.Router();

//Require the controllers 
const product_controller = require('../controllers/product.controller');

module.exports = router; 

router.post('/create',product_controller.product_create); //create
router.get('/:id',product_controller.product_details); //read 
router.put('/:id/update', product_controller.product_update); //update
router.delete('/:id/delete', product_controller.product_delete); //delete