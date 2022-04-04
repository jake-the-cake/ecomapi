const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
	const authHeader = req.headers.token;
	if(authHeader){
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT, (err, user)=>{
			if(err){
				res.status(403).json("Invalid token");
			}else{
				req.user = user;
				next();
			}
		});
	} else {
		return res.this.status(401).json("You're not welcome in these parts.");
	};
};

const tokenAuth = (req,res,next)=>{
	verifyToken(req,res,()=>{
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("Get out of here!");
		};
	});
};

const adminAuth = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("Can't do that!");
		};
	});
};

module.exports = { tokenAuth, adminAuth};