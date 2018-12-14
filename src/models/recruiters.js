import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';
import _ from 'lodash';
import {generateJwtToken} from '../utility/generatetoken';
const recruiterSchema = new Schema({
    name : {
        type: String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    phone : {
        type: String,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    email : {
        type : String,
        required :true,
        minlength : 6,
        maxlength : 100
    },
    password : {
        type : String,
        required :true,
        minlength : 8,
        maxlength : 100000
    },
    company : {
        type : String,
        required :true,
        minlength : 3,
        maxlength : 30
    },
    level : {
        type : String,
        enum :[ 'Bronze I', 'Bronze II', 'Bronze III', 'Bronze IV', 'Bronze V',
                'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver V',
                'Gold I', 'Gold II', 'Gold III', 'Gold IV', 'Gold V',
                'Diamond I', 'Diamond II', 'Diamond III', 'Diamond IV', 'Diamond V',
                'Platinum I', 'Platinum II', 'Platinum III', 'Platinum IV', 'Platinum V',
                'Master I', 'Master II', 'Master III', 'Master IV', 'Master V'
              ],
        default : 'Bronze I'
    },
    
})

 export const  postSchema = {

     name : Joi.string().required().min(3).max(50),
     phone : Joi.number().required().min(10),
     email : Joi.string().email().required().min(6).max(100),
     company : Joi.string().required().min(3).max(30),
     password : Joi.string().required().min(8).max(1000)

 }

 export const putSchema = {
    name : Joi.string().required().min(3).max(50),
    phone : Joi.number().required().min(10),
    company : Joi.string().required().min(3).max(30),
 }

 export function validateRecruiter( recruiter, schema){
        return Joi.validate(recruiter  , schema)
 }


 recruiterSchema.methods.generateToken = async function(){
    try{
      const token = await generateJwtToken({id:this._id});
      return token;
    }
    catch(ex){
       return false;
    }

 }
 const Recruiter = mongoose.model('Recruiter', recruiterSchema);

 export default Recruiter;

