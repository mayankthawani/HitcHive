const captainmodel = require('../models/captain.model');
const captainservice = require('../service/captain.service'); // Fixed typo
const { validationResult } = require('express-validator');
const cookie = require('cookie-parser');
const blacklistTokenSchema = require('../models/blacklisttoken.model'); // Ensure this is defined

module.exports.registercaptain = async (req, res, next) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
        return res.status(400).json({ errors: Errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password || !vehicle ||
        !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const iscaptainexist = await captainmodel.findOne({ email });
    if (iscaptainexist) {
        return res.status(400).json({ errors: [{ msg: "Captain already exists" }] });
    }

    const hashpassword = await captainmodel.hashpassword(password);

    let captain = await captainservice.createcaptain({ // Fixed typo
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashpassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    captain = await captainmodel.findById(captain._id); // Ensure we get a Mongoose instance

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
};

module.exports.logincaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainmodel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    const ismatch = await captain.comparepassword(password);
    if (!ismatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, captain });
};

module.exports.getprofile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).json({ captain });
};

module.exports.logoutcaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies?.token || 
        (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(400).json({ error: "No token provided" });
    }

    try {
        await blacklistTokenSchema.create({ token }); // Ensure blacklist model is defined
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.logoutcaptain = async (req, res, next) => {
    res.clearCookie('token');
    
    const token = req.cookies?.token || 
        (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(400).json({ error: "No token provided" });
    }

    try {
        // Save token in blacklist
        const blacklistedToken = await blacklistTokenSchema.create({ token });
        console.log(" Blacklisted Token Saved:", blacklistedToken);

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

