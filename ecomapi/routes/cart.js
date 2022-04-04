const router = require("express").Router();
const { query } = require("express");
const Cart = require("../models/Cart");
const { adminAuth, tokenAuth } = require("./verify");

// Create Cart
router.post("/", tokenAuth, async (req, res) => {
	const newCart = new Cart(req.body);
	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json(err);
	};
});

// Update Cart
router.put("/update", tokenAuth, async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	};
});

// Delete Product
router.delete("/:id/del", tokenAuth, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json("Goodbye, cart #" + req.params.id)
	} catch (err) {
		res.status(500).json(err);
	};
});

// Get User Cart
router.get("/:userId", adminAuth, async (req, res) => {
	try {
		const c = await Cart.findOne({userId: req.params.userId});
		res.status(200).json(c);
	} catch (err) {
		res.status(500).json(err);
	};
});

// Get All Carts
router.get("/", adminAuth, async (req, res) => {
	try {
			c = await Cart.find();
		res.status(200).json(c)
	} catch (err) {
		res.status(500).json(err)
	};
});

module.exports = router;