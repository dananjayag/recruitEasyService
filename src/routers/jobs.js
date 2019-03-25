import express from 'express';
import {getJobs, getJob, createJob, updateJob, deleteJob} from '../controllers/jobs';
const Router = express.Router();

Router.get('/', getJobs)

Router.get('/:id', getJob)

Router.post('/', createJob)

// Router.put('/:id', updateJob)

// Router.delete('/:id', deleteJob)

export default Router;  