const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const db_path = 'mongodb://localhost:27017/airbnb';
const port = 5005;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoURL = "mongodb://localhost:27017/airbnb";

// Set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Local Modules
const useRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const routePath = require("./utils/pathUtils");
const errorsControler = require("./controllers/errors");
// const { mongoConnect }= require('./utils/database');

// Middleware
app.use(express.urlencoded({ extended: true }));
const store = new MongoDBStore({
    uri : mongoURL,
    collection : 'session'
});
app.use(session({
    secret : "Ayush@2025",
    resave : false,
    saveUninitialized : true,
    store : store
}));
// app.use(cookieParser());

// Serve static files BEFORE any routes
app.use(express.static(path.join(routePath, 'public')));

// Routes
app.use(authRouter);
app.use((req,res,next)=>{
    req.isLoggedIn = req.session.isLoggedIn;
    if(req.isLoggedIn){
        next();
    }else{
        res.redirect("/Login");
    }
});
app.use(useRouter);
app.use(hostRouter);


// 404 handler
app.use(errorsControler.pageNotFound);

// Server

const dn = '192.168.0.117';

mongoose.connect(db_path).then(()=>{
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running locally at http://localhost:${port}`);
        console.log(`Also accessible over network at http://${dn}:${port}`);
    });
}).catch(err =>{
    console.log('Error Connecting to mongoDB: ',err);
})