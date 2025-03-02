const express = require('express');
const router = express.Router();
const captaincontroller = require('../controlers/captain.controlers');
const {body} = require('express-validator'); //express-validator is a middleware for validating and sanitizing user input in Express.js. It prevents:Invalid input (e.g., checking if an email is actually an email) Missing fields (e.g., ensuring a password is provided) Security risks (e.g., preventing SQL injection or XSS attacks)
const authmiddleware = require('../middlewares/auth.mddlewares');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email, must be a valid format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname').custom(value => {
        if (!value || !value.firstname || value.firstname.length < 3) {
            throw new Error('First name should be at least 3 characters long');
        }
        return true;
    }),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','auto','bike']).withMessage('Invalid vehicle type')
], captaincontroller.registercaptain);

// 
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captaincontroller.logincaptain);

router.get('/profile', authmiddleware.authcaptain, captaincontroller.getprofile);

router.get('/logout', authmiddleware.authcaptain, captaincontroller.logoutcaptain);

module.exports = router;
