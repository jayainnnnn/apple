// core modules
const path = require('path');

// external modules
const express = require('express');

const loginRouter = express.Router();
const rootdir = require('../utils/pathutil');


loginRouter.get('./login', (req,res,next) => {
    res.sendFile(path.join(rootdir,'views','login.html'));
});


module.exports = loginRouter;