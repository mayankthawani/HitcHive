const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
dotenv.config();
const cors = require('cors');
const connecttodb = require('./db/db');
const userroutes = require('./routes/user.routes');
const captainroutes = require('./routes/captain.routes');

app.use(express.json()); // Ensure this is applied before routes
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connecttodb();

// Debugging middleware to check incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Register routes
app.use('/users', userroutes);
app.use('.users', userroutes);
app.use('/captain' , captainroutes);
app.use(cookie());

app.get('/', (req, res) => {
    res.send("Hello world");
});

module.exports = app;
