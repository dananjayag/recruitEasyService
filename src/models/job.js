import  mongoose,{Schema} from 'mongoose';

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
    }
})


const Jobs = mongoose.model(jobSchema);

export default Jobs;