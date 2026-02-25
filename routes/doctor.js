const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req,file,cb){
        cb(null,"public/uploads/");
    },

    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({storage:storage});


// Show all doctors
router.get("/doctors", async (req,res)=>{

    const doctors = await Doctor.find();

    res.render("doctors",{doctors});

});


// Add doctor form
router.get("/add-doctor",(req,res)=>{
    res.render("addDoctor");
});


// Save doctor
router.post("/add-doctor", upload.single("image"), async (req,res)=>{

    const doctor = new Doctor({

        name:req.body.name,
        specialization:req.body.specialization,
        experience:req.body.experience,
        fees:req.body.fees,
        image:"/uploads/" + req.file.filename

    });

    await doctor.save();

    res.redirect("/admin");

});


module.exports = router;