const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const authRoute = require("./routes/auth")

dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(()=>console.log("...green light, data!"))
	.catch((err)=>{console.log(err)})
;

app.use(express.json());
app.use("/api/u", userRoute);
app.use("/api/p", productRoute);
app.use("/api/c", cartRoute);
app.use("/api/o", orderRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend operational...")
});