import Candidate, {validateCandidate} from '../models/candidate';

export async function getCandidates(req,res,next){
    try {
       const candidates = await Candidate.find();
       if(!!candidates){
       res.status(200).send({candidates});
       }
       next()
    }
    catch(ex){
        next();
    }
}
