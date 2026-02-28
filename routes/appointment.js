const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");


// Book appointment form
router.get("/book/:doctorId", async (req,res)=>{

    const doctor = await Doctor.findById(req.params.doctorId);

    res.render("bookAppointment",{doctor});

});
// Patient Dashboard
router.get("/dashboard", async (req,res)=>{

    if(!req.session.userId){
        return res.redirect("/login");
    }

    const appointments = await Appointment.find({
        patientId:req.session.userId
    }).populate("doctorId");

    res.render("dashboard",{appointments});

});


// Save appointment
router.post("/book/:doctorId", async (req,res)=>{

    const {date,time} = req.body;

    const appointment = new Appointment({

        doctorId:req.params.doctorId,
        patientId:req.session.userId,
        date,
        time

    });

    await appointment.save();

    res.send("Appointment Booked Successfully");

});



module.exports = router;