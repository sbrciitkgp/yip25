const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();


const app = express();

const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// make flash messages available in all views
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash(); // store all flash types
  next();
});

// now load setUser
const setUser = require("../middlewares/setUser");
app.use(setUser);



// ====== Middlewares ======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ====== View Engine ======
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====== Routes ======

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/previous-editions',(req,res)=>{
    res.render('previous')
})

app.get('/messages',(req,res)=>{
    res.render('messages')
})

app.get('/themes',(req,res)=>{
    res.render('themes')
})

// ====== Server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
