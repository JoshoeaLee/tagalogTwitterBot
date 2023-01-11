require('dotenv').config();

const express = require('express');

//Run this when on lambda but use localhost when on machine
const serverless = require('serverless-http');
const app = express();

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (e)=> console.error(e));
db.once('open', ()=>console.log('Connection Successful!'));

app.use(express.json());

const tagalogRouter = require('./routes/tagalog');
app.use('/tagalog', tagalogRouter);

if(process.env.ENVIRONMENT === "awsLambda"){
    module.exports.handler = serverless(app);
}else{
    app.listen(1080, () => console.log("Server Started"));
}


