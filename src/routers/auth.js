import express from 'express';
import {loginContoller} from '../controllers/auth';
const Router = express.Router();
Router.post('/',loginContoller);

export default Router;