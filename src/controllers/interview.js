import Interview, {validateInterview} from '../models/interview';


export async function getInterview(req,res,next){

    const { user = {} } = req.locals || {};
    try {
       const interview = await Interview.findOne({_id:req.params.id, recruiter : user.id}).populate();
       if(!!interview){
       res.status(200).send({interview});
       }
       next()
    }
    catch(ex){
        next();
    }
}

export async function createInterview(req,res,next){
    const { user = {} } = req.locals || {};
    const { id } = user;
    const { job, candidate, currentSalary=1, expectedSalary=1, status} = req.body;
    const interviewToCreate = {
        job,
        candidate,
        recruiter: id,
        currentSalary,
        expectedSalary,
        status
    }
    const {error} = validateInterview(interviewToCreate);
        if(!!error) return res.status(400).send({"error_message":error.details[0].message});
        const interview = new Interview(interviewToCreate);
        try{
            await interview.save();
            res.status(200).send(interview);
            next();
        }
        catch(err){
            res.status(400).send({err});
            next();
        }
    
}



export async function updateInterview(req,res,next){
    const { user = {} } = req.locals || {};
    const { id } = user;
    const { currentSalary=1, expectedSalary=1, status} = req.body;

    const {error} = validateInterview(interviewToCreate);
        if(!!error) return res.status(400).send({"error_message":error.details[0].message});
        const interview = new Interview(interviewToCreate);
        try{
            await interview.save();
            res.status(200).send(interview);
        }
        catch(err){
            res.status(400).send({err});
        }
    
}