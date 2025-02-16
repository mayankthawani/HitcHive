const captainmodel = require('../models/captain.model');
const caprainservice = require('../service/captain.service')
const {validationResult} = require('express-validator');


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

    let captain = await caprainservice.createcaptain({
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
