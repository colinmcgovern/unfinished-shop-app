const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var ProductSchema = new Schema({
	name: {type: String, required: true},
	price: {type: Number, required: true},
	created_by: {type: String, required: true},
});

//Export the model 
module.exports = mongoose.model('Product',ProductSchema);