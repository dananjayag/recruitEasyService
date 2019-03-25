import mongoose, {Schema} from 'mongoose';
import Interview from './interview';
import Joi from 'joi';
const jobSchema = new Schema({
    title : {
        type : String,
        required :true,
    },
    min_salary : {
        type : Number,
        default : 0
    },
    max_salary : {
        type : Number,
        default : 0
    },
    date_posted : {
        type : Date
    },
    hiring_organization : {
        type : String
    },
    job_location : {
        type :String
    },
    created_by :{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Recruiter'
    },
    job_description : {
        type : String
    },
    company_url : {
        type : String
    },
    interviews: [Interview.schema]
})


const Jobs = mongoose.model('Jobs', jobSchema);


export const  schema = {
    title : Joi.string().required(),
    hiring_organization: Joi.string().required(),
    job_description : Joi.string(),
    created_by: Joi.string(),
    min_salary: Joi.number(),
    max_salary: Joi.number(),
    date_posted: Joi.date(),
    company_url: Joi.string(),
    job_location: Joi.string(),
}


export function validateJob(job){
    return Joi.validate(job, schema)
}

export default Jobs;