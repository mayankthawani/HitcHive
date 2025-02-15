

const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authuser = async (req, res, next) => {
    try {
        // Check for token in cookies or Authorization header
        const token = req.cookies?.token || 
            (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        console.log("Received Token:", token); // Debugging

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const isblacklisted = await usermodel.findOne({ token: token });
        if (isblacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging

        // Fetch user from DB
        const user = await usermodel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

