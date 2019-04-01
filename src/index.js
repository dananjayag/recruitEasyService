import config from 'config';
import db from './db/database';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Joi from 'joi';
import Joi_objectId from 'joi-objectid';
Joi.objectId = Joi_objectId(Joi);

import recruiter from  './routers/recruiter';
import jobs from './routers/jobs'
import auth from './routers/auth';
import candidate from  './routers/candidate';
import interview from './routers/interview';
import {errorMiddleWare} from './middlewares/error'
import {authMiddleware} from './middlewares/auth';
const app = express();

process.on('unhandledRejection',(err)=>{
    console.log("Something went wrong ", err);
    process.exit(1);
})
process.on('uncaughtException',(err)=>{
    console.log("Something went wrong ", err);
    process.exit(1)
})
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/auth', auth);
app.use('/api/v1/recruiter',authMiddleware, recruiter);
app.use('/api/v1/candidate',authMiddleware, candidate);
app.use('/api/v1/interview',authMiddleware, interview);
app.use('/api/v1/job',authMiddleware, jobs);
app.use(errorMiddleWare);

app.listen(3001,()=>{
    console.log("Started Server in port number 3000")
})



