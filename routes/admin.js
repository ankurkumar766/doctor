const express = require("express");
const router = express.Router();

const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");


// Admin dashboard
router.get("/admin", async (req,res)=>{

    if(req.session.role !== "admin"){
        return res.send("Access denied");
    }

    const doctors = await Doctor.find();

    const appointments = await Appointment.find()
    .populate("doctorId")
    .populate("patientId");

    res.render("admin",{
        doctors,
        appointments
    });

});


// Delete doctor
router.get("/delete-doctor/:id", async (req,res)=>{

    await Doctor.findByIdAndDelete(req.params.id);

    res.redirect("/admin");

});


module.exports = router;