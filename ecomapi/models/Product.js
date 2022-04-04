const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
		cat: {
			type: Array,
		},
		size: {
			type: String,
		},
		color: {
			type: String,
		},
		price: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);