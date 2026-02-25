const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// Register page
router.get("/register",(req,res)=>{
    res.render("register");
});


// Register user
router.post("/register", async (req,res)=>{

    const {name,email,password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
        name,
        email,
        password:hashedPassword
    });

    await user.save();

    res.redirect("/login");

});


// Login page
router.get("/login",(req,res)=>{
    res.render("login");
});


// Login user
router.post("/login", async (req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.send("User not found");
    }

    const valid = await bcrypt.compare(password,user.password);

    if(!valid){
        return res.send("Wrong password");
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    res.redirect("/dashboard");

});


// Logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;