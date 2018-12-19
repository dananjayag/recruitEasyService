import Jobs from '../models/job';

export async function getJobs(req,res){
    try {
       const jobs = await Jobs.find({recruiter : req.locals.user.id});
        res.status(200).send(jobs);
    }
    catch(ex){
        console.log(ex);
        next();
    }
}
export async function getJob(req,res){
    try {
       const jobs = await Jobs.findOne({_id:req.params.id,recruiter : req.locals.user.id});
        res.status(200).send(jobs);
    }
    catch(ex){
        console.log(ex);
        next();
    }
}
export async function createJob(req,res){
    try {
       const jobs = await Jobs.find({_id:req.params.id,recruiter : req.locals.user.id});
        res.status(200).send(jobs);
    }
    catch(ex){
        console.log(ex);
        next();
    }
}