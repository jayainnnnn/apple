// core module
const path = require('path')

// external module
const express = require('express')
const axios = require('axios');

const homeRouter = express.Router()
const rootdir = require('../utils/pathutil')

homeRouter.get("/",(req, res, next ) => {
    res.render('home',{pageTitle:'home'});
});

homeRouter.get("/login",(req,res,next) => {
     res.sendFile(path.join(rootdir, 'views', 'login.html'));
});


homeRouter.post("/login",async(req,res,next) => {
    const {gmail, password} = req.body;
    console.log(req.body);
    try{
        const response = await axios.post('http://localhost:3009/login',{
            gmail,
            password
        },{
            headers: { "Content-Type": "application/json" }
        })
        res.render('home',{pageTitle:'Home'});
    }
    catch(error){
        const detail = error.response?.data?.detail || 'unknown error';
        console.log(response)
        if (detail === "USER NOT FOUND") {
            res.status(404).send("Login failed: User doesnot exist");
        }
        if (detail === "INVALID PASSWORD") {
            res.status(401).send("Login failed: Invalid Password");
        } 
        else {
            console.error("Login Error:", detail);
            res.status(500).send("Login failed due to server error.");
        }
    }
});

homeRouter.get("/signup",(req,res,next) => {
    res.sendFile(path.join(rootdir,'views','signup.html'));
});

homeRouter.post("/signup",async(req,res,next) => {
    const { name, gmail, password } = req.body;
    try{
        const response = await axios.post('http://localhost:3009/signup', {
            name,
            gmail,
            password
        }, {
            headers: { "Content-Type": "application/json" }
        });
        res.render('home',{pageTitle:'Home'});
    }
    catch(error){
        const detail = error.response?.data?.detail || "Unknown error";
        if (detail === "GMAIL ALREADY EXISTS") {
            res.status(400).send("Signup failed: Gmail already exists. Please try logging in.");
        } 
        else {
            console.error("Signup Error:", detail);
            res.status(500).send("Signup failed due to server error.");
        }
    }
});

module.exports = homeRouter;




