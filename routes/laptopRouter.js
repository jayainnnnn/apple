// core modules
const path = require('path');

// external modules
const express = require('express');

const laptopRouter = express.Router();
const rootdir = require('../utils/pathutil');

laptopRouter.get('/',(req,res,next) => {
    res.render('laptops',{pageTitle:'Laptops'});
});

module.exports = laptopRouter




