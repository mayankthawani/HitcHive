const express = require('express');
const router = express.Router();
const captaincontroller = require('../controlers/captain.controlers');
const {body} = require('express-validator'); //express-validator is a middleware for validating and sanitizing user input in Express.js. It prevents:Invalid input (e.g., checking if an email is actually an email) Missing fields (e.g., ensuring a password is provided) Security risks (e.g., preventing SQL injection or XSS attacks)



router.post('/register' , [
    body('email').isEmail().withMessage('Invalid email email must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
    body('fullname').custom(value => {
        if (!value || !value.firstname || value.firstname.length < 3) {
            throw new Error('First name should be at least 3 characters long');
        }
        return true;
    }),
    body('vehicle.color').isLength({min : 3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' , 'bike' ]).withMessage('Invalid vehicle type')
    
],
captaincontroller.registercaptain
)



module.exports = router;