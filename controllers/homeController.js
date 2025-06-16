const path = require('path');
const axios = require('axios');

const api_path = 'http://127.0.0.1:8000'
const rootdir = require('../utils/pathutil');


exports.homeController = (req,res,next) => {
    res.render('home',{pageTitle:'home',username:req.session.user?.name});
};

exports.getlogin = (req,res,next) => {
    res.sendFile(path.join(rootdir, 'views', 'login.html'));
}

exports.postlogin = async(req,res,next) => {
        const {gmail, password} = req.body;
        try{
            const response = await axios.post(`${api_path}/login`,{
                gmail,
                password
            },{
                headers: { "Content-Type": "application/json" }
            })
            const {name} = response.data
            req.session.user = {
            name: name,
            gmail: req.body.gmail
            };
            res.render('home',{pageTitle:'Home',username:req.session.user?.name});
        }
        catch(error){
            res.sendFile(path.join(rootdir,'views','error.html'));
        }
}

exports.getsignup = (req,res,next) => {
    res.sendFile(path.join(rootdir,'views','signup.html'));
}

exports.postsignup = async(req,res,next) => {
    const { name, gmail, password } = req.body;
        try{
            const response = await axios.post(`${api_path}/signup`, {
                name,
                gmail,
                password
            }, {
                headers: { "Content-Type": "application/json" }
            });
            res.render('home',{pageTitle:'Home',username:req.session.user?.name});
        }
        catch(error){
            res.sendFile(path.join(rootdir,'views','error.html'));
        }
}

exports.getlogout = (req,res,next) => {
    try{
    req.session.destroy();
    res.render('home',{pageTitle:'home',username:null});
    }
    catch(error){
        res.sendFile(path.join(rootdir,'views','error.html'));
    }
}

exports.get404 = (req,res,next) => {
    res.sendFile(path.join(rootdir,'views','404.html'));
}