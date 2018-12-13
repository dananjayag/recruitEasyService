import config from 'config';
import db from './db/database';
import express from 'express';
import bodyParser from 'body-parser';

import Joi from 'joi';
import Joi_objectId from 'joi-objectid';
Joi.objectId = Joi_objectId(Joi);

import recruiter from  './routers/recruiter';
const app = express();

process.on('unhandledRejection',(err)=>{
    console.log("Something went wrong ", err)
})
process.on('uncaughtException',(err)=>{
    console.log("Something went wrong ", err)
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/recruiter',recruiter);

app.listen(3000,()=>{
    console.log("Started Server in port number 3000")
})



