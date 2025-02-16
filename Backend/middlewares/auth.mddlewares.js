const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model');
const captainmodel = require('../models/captain.model');
const blacklistTokenSchema = require('../models/blacklisttoken.model'); // Ensure this exists

module.exports.authuser = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.token || 
            (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        console.log("Received Token:", token); // Debugging

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // 🔹 Check if token is blacklisted
        const isBlacklisted = await blacklistTokenSchema.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
        }

        // 🔹 Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging

        // 🔹 Fetch user from DB
        const user = await usermodel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);

        // 🔹 Handle Token Expiration Separately
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token expired, please log in again" });
        }

        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports.authcaptain = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.token || 
            (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        console.log("Received Token:", token); // Debugging

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // 🔹 Check if token is blacklisted
        const isBlacklisted = await blacklistTokenSchema.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
        }

        // 🔹 Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging

        // 🔹 Fetch captain from DB
        const captain = await captainmodel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        // Attach captain to request
        req.captain = captain;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);

        // 🔹 Handle Token Expiration Separately
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token expired, please log in again" });
        }

        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
