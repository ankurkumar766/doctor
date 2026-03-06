require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctor");
const appointmentRoutes = require("./routes/appointment");
const adminRoutes = require("./routes/admin");

const app = express();

// ✅ Use Atlas URI from Render environment
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
// ✅ ROUTES AFTER SESSION
app.use("/", authRoutes);
app.use("/", doctorRoutes);
app.use("/", appointmentRoutes);
app.use("/", adminRoutes);
app.get("/", (req,res)=>{
    res.render("home",{role:req.session.role});
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});














