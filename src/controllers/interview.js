import IcalGenerator from 'ical-generator';
import Interview, {validateInterview} from '../models/interview';
import Recruiter from '../models/recruiters';
import { sendEmail } from '../utility/mailer';

export async function getInterview(req,res,next){
    const { user = {} } = req.locals || {};
    try {
       const interview = await Interview.findById({_id:req.params.id}).populate('candidate');
       if(!!interview){
       res.status(200).send({interview});
       }
       next();
    }
    catch(ex){
        next();
    }
}

export async function createInterview(req,res,next){
    const { user = {} } = req.locals || {};
    const { id } = user;
    const { job, candidate, currentSalary=1, expectedSalary=1, status="Contacted"} = req.body;
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
        let interview = new Interview(interviewToCreate);
        try{
            const response = await interview.save();
            interview = await Interview.findById({_id: response._id}).populate('candidate');
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
      try{
            const interview  = await Interview.findByIdAndUpdate({_id: req.params.id}, {currentSalary, expectedSalary, status})
            if(!!interview){
                res.status(200).send(interview);
            }
            else {
                next();
            }
        }
        catch(err){
            res.status(400).send({err});
            next();
        }
}

export async function scheduleInterview(req, res, next){
    const { user = {} } = req.locals || {};
    const { id } = user;
    const { link, scheduledAt, interviewId} = req.body;
    console.log("sent Obj ", {link, scheduledAt, interviewId});
      try{
            const recruiter = await Recruiter.findById({_id: id});
            const interview = await Interview.findById({_id: interviewId}).populate('candidate');
            const info = await sendEmail({cc: recruiter.email,candidateName:interview.candidate.email,  to: interview.candidate.email, start: scheduledAt, organizer: recruiter.name, link});
            if(!! info ){
                res.status(200).send({info});
            } else {
                next();
            }
     }
     catch(err){
            next();
     }
}