// core module
const path = require('path')

// external module
const express = require('express')

// internal modules
const login = require('./login')

const homeRouter = express.Router()
const rootdir = require('../utils/pathutil')

homeRouter.get("/",(req, res, next ) => {
    res.sendFile(path.join(rootdir,'views','home.html'));
});

homeRouter.get("/login",(req,res,next) => {
     res.sendFile(path.join(rootdir, 'views', 'login.html'));
})


module.exports = homeRouter;




