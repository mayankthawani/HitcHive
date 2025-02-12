const express = require('express');
const router = express.Router();//idhr se udhr jane ke liye
const {body} = require('express-validator');
const usercontrolers = require('../controlers/user.controlers')

router.get('/test', (req, res) => {
    console.log("Test route hit");
    res.json({ message: "User routes working!" });
});

router.post('/register', (req, res, next) => {
    console.log("Request received at /register");
    next(); // This will pass control to the controller
}, [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long'),
    body('fullname').custom(value => {
        if (!value || !value.firstname || value.firstname.length < 3) {
            throw new Error('First name should be at least 3 characters long');
        }
        return true;
    })
], usercontrolers.registeruser);



router.post('/login', (req, res, next) => {
    console.log("Request received at /login");
    next(); // This will pass control to the controller

} , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], usercontrolers.loginuser);









module.exports = router; 