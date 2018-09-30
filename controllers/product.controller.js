const Product = require('../models/product.model');

//CAN THIS BE DELETED?
//Simple Controller, missing validation or sanitation 
/*
exports.test = function(req,res) {
	res.send('Greetings from the Test Controller');
}
*/

//Create 
exports.product_create = function (req, res) {

	var product = new Product({
		name: req.body.name,
		price: req.body.price,
		created_by: req.body.created_by
	});

	product.save(function (err) {
		if (err) {
			return next (err);
		}
		res.send('Product created successfully');
	});
};

//Read 
exports.product_details = function (req, res) {

	if(req.params.id == "all"){
		Product.find( function (err,product) {
		if (err) return next(err);
		res.send(product);
		})
	}
	else
	{
		Product.findById(req.params.id, function (err,product) {
		if (err) return next(err);
		res.send(product);
		})
	}
};

//Update 
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product updated.');
    });
};

//Delete
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};