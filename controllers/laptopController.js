// global modules
const path = require('path');
const axios = require('axios');

const api_path = 'http://127.0.0.1:8000';
const rootdir = require('../utils/pathutil');

exports.laptopRouter = (req,res,next) => {
    if (req.session.user?.name){
        res.render('laptophome',{pageTitle:'Laptops',username:req.session.user?.name});
    }
    else{
        res.sendFile(path.join(rootdir,'views','login.html'));
    }
}

exports.laptopproduct = (req,res,next) => {
    if (req.session.user?.name){
        res.render('product',{
                pageTitle:'product',
                username:req.session.user?.name,
                image_path:'/images/applem4pro.jpg',
                name:"apple m3",
                price:2000,
                max_price:20000,
                discount:50
        });
    }
    else{
        res.render('home',{pageTitle:'home',username:null});
        }};