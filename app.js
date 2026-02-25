const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctor");
const appointmentRoutes = require("./routes/appointment");
const adminRoutes = require("./routes/admin");

require("dotenv").config();

const app = express();


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/doctorApp")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Middleware
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


// ✅ SESSION MUST BE HERE (before routes)
app.use(session({
    secret: process.env.SECRET || "mysupersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/doctorApp",
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));


// ✅ ROUTES AFTER SESSION
app.use("/", authRoutes);
app.use("/", doctorRoutes);
app.use("/", appointmentRoutes);
app.use("/", adminRoutes);


// Home route
app.get("/", (req,res)=>{
    res.render("home",{role:req.session.role});
});


// Server start
app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});