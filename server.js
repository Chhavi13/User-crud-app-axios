const express = require("express");
const app =express();

const morgan = require('morgan');
const dotenv =require('dotenv');
const bodyparser = require("body-parser");
const path =require('path');
const connectDb=require('./server/database/connection');



dotenv.config({path:'config.env'});
const PORT= process.env.PORT || 1320;
//log request
app.use(morgan('tiny'))

connectDb();
//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))
 
//set view engine
app.set("view engine","ejs");

//whenever the view folder inside other folder
//app.set("views",path.resolve(__dirname,'views/ejs'))

//load assets
 app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
 app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
 app.use('/js',express.static(path.resolve(__dirname,'assets/js')))


 //load router
 app.use('/',require('./server/routes/router'));
 

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)

});