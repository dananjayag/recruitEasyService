import express from 'express';
import {getInterview, createInterview, updateInterview, deleteInterview, scheduleInterview} from '../controllers/interview';
const Router = express.Router();

Router.get('/:id', getInterview)

Router.post('/', createInterview)

Router.put('/:id', updateInterview)

Router.post('/scheduleInterview', scheduleInterview)
//Router.delete('/:id', deleteInterview)

export default Router;  