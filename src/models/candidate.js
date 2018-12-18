import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';
import _ from 'lodash';

const candidateSchema = new Schema({
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
    created_by : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Recruiter'
    }
})

 export const  schema = {
     name : Joi.string().required().min(3).max(50),
     phone : Joi.number().required().min(10),
     email : Joi.string().email().required().min(6).max(100),
 }

 export function validateCandidate( candidate, schema){
        return Joi.validate(candidate  , schema)
 }

 const Candidate = mongoose.model('Candidate', candidateSchema);

 export default Candidate;

