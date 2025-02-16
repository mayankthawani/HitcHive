const captainmodel = require('../models/captain.model');

module.exports.createcaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    console.log("Incoming Data:", { firstname, lastname, email, password, color, plate, capacity, vehicleType });

    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = await captainmodel.create({
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType }
    });

    return captain;
};
