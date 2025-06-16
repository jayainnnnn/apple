// core modules
const path = require('path');
const rootdir = require('../utils/pathutil');

// external modules
const express = require('express');
const laptopRouter = express.Router();
const laptopController = require('../controllers/laptopController');

laptopRouter.get('/',laptopController.laptopRouter);

laptopRouter.get('/product',laptopController.laptopproduct);

module.exports = laptopRouter




