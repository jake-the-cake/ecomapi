const router = require("express").Router();
const { query } = require("express");
const Order = require("../models/Order");
const { adminAuth, tokenAuth } = require("./verify");

// Create Order
router.post("/", tokenAuth, async (req, res) => {
	const newOrder = new Order(req.body);
	try {
		const savedOrder = await newOrder.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		res.status(500).json(err);
	};
});

// Update Order
router.put("/update", tokenAuth, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedOrder);
	} catch (err) {
		res.status(500).json(err);
	};
});

// Delete Order
router.delete("/:id/del", tokenAuth, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json("Goodbye, order #" + req.params.id)
	} catch (err) {
		res.status(500).json(err);
	};
});

// Get User Order
router.get("/:userId", adminAuth, async (req, res) => {
	try {
		const o = await Order.findOne({ userId: req.params.userId });
		res.status(200).json(o);
	} catch (err) {
		res.status(500).json(err);
	};
});

// Get All Orders
router.get("/", adminAuth, async (req, res) => {
	try {
		const o = await Order.find();
		res.status(200).json(o);
	} catch (err) {
		res.status(500).json(err);
	};
});

router.get("/income", adminAuth, async (req,res)=>{
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: prevMonth }}},
			{
				$project: {
					month: { $month: "$createdAt" },
					sales: "$amount"
				}
			},
			{
				$group: {
					_id:"$month",
					total:{$sum: "$sales"}
				}
			}
		]);
		res.status(200).json(income);
	} catch(err) {
		res.status(500).json(err);
	};
});

module.exports = router;