import config from 'config';
import db from './db/database';
import express from 'express';
import bodyParser from 'body-parser';

import Joi from 'joi';
import Joi_objectId from 'joi-objectid';
Joi.objectId = Joi_objectId(Joi);

import recruiter from  './routers/recruiter';
import auth from './routers/auth';
import candidate from  './routers/candidate';

const app = express();

process.on('unhandledRejection',(err)=>{
    console.log("Something went wrong ", err);
    process.exit(1);
})
process.on('uncaughtException',(err)=>{
    console.log("Something went wrong ", err);
    process.exit(1)
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/recruiter',recruiter);
app.use('/api/v1/candidate',candidate);
app.use('/api/v1/auth',auth);

app.listen(3000,()=>{
    console.log("Started Server in port number 3000")
})



