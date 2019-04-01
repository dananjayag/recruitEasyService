import Jobs, {validateJob} from '../models/job';
import Interview from '../models/interview';

export async function getJobs(req,res, ){
    try {
       const { user ={} } = req.locals || {};
       const jobs = await Jobs.find({created_by : user.id}).sort({date_posted: -1}).exec();
        res.status(200).send(jobs);
    }
    catch(ex){
        next();
    }
}
export async function getJob(req,res,next){

    const { user = {} } = req.locals || {};
    try {
       const job = await Jobs.findOne({_id:req.params.id, created_by : user.id});
       const interviews = await Interview.find({'job' : job._id}).populate('candidate');
       if(!!job && !!interviews){
       res.status(200).send({job, interviews});
       }
       next()
    }
    catch(ex){
        next();
    }
}
export async function createJob(req,res,next){
    const { user = {} } = req.locals || {};
    const { id } = user;
    const { title="", min_salary=1, max_salary=1, date_posted = new Date(), hiring_organization="", job_location="", job_description="", company_url} = req.body;
    const jobToCreate = {
        title,
        min_salary,
        max_salary,
        date_posted,
        hiring_organization,
        job_location,
        job_description,
        company_url,
        created_by: id,
    }
    const {error} = validateJob(req.body);
        if(!!error) return res.status(400).send({"error_message":error.details[0].message});
        const job = new Jobs(jobToCreate);
        try{
            await job.save();
            res.status(200).send(job);
        }
        catch(err){
            res.status(400).send({err});
        }
    
}