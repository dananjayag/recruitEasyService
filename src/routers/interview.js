import express from 'express';
import {getInterview, createInterview, updateInterview, deleteInterview} from '../controllers/interviews';
const Router = express.Router();

Router.get('/:id', getInterview)

Router.post('/', createInterview)

Router.put('/:id', updateInterview)

Router.delete('/:id', deleteInterview)

export default Router;  