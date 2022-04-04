const router = require("express").Router();
const { query } = require("express");
const Product = require("../models/Product");
const { adminAuth, tokenAuth } = require("./verify");

// Create Product
router.post("/", adminAuth, async (req,res)=>{
	const newProduct = new Product(req.body);
	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch(err) {
		res.status(500).json(err);
	};
});

// Update Product
router.put("/:id/update", adminAuth, async (req,res)=>{
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch(err) {
		res.status(500).json(err);
	};
});

// Delete Product
router.delete("/:id/del", adminAuth, async (req,res)=>{
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Goodbye, product #" + req.params.id)
	} catch(err) {
		res.status(500).json(err);
	};
});

// Get Single Product By Id
router.get("/:id", async (req,res)=>{
	try {
		const p = await Product.findById(req.params.id);
		res.status(200).json(p);
	} catch(err) {
		res.status(500).json(err);
	};
});

// Get All Products
router.get("/", async (req, res)=>{
	const qNew = req.query.new;
	const qCat = req.query.cat;
	try {
		let p;
			if(qNew){
				p = await Product.find().sort({createdAt: -1}).limit(5);
			} else if(qCat) {
				p = await Product.find({cat:{$in: [qCat],},});
			} else {
				p = await Product.find();
			}
		res.status(200).json(p)
	} catch(err) {
		res.status(500).json(err)
	};
});

module.exports = router;