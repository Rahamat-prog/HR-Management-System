// imports

require('dotenv').config();
const express = require('express');

const session = require('express-session');
const path = require('path');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 4000;



// database connection






app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")));




app.use(express.static('public'))


// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'my secrect key',
    saveUninitialized: true,
    resave: false,
})
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})


// set template engin
app.set('view engine', "ejs");

// route prefix
app.use("", require("./routes/routes"));



app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`);
});