import express from 'express';
import _ from 'lodash';
import Candidate,{validateCandidate,schema} from '../models/candidate';
const Router = express.Router();

Router.get('/',async (req, res)=>{
   try{
    let candidates = await Candidate.find().sort("name");
    res.status(200).send(candidates);
   }
   catch(err){
    res.status(500).send({err});
   }
})

Router.get('/:id',async (req, res)=>{
    try{
        let candidate = await Candidate.findOne({_id : req.params.id});
        if(!candidate) return res.status(400).send({error : "Candidate doesn't exist"});
        res.status(200).send(candidate);
    }
    catch(err){
        res.status(400).send({error : "Invalid Id"});
    }
})

Router.post('/',async(req, res)=>{
      // Validating request
      const {error} = validateCandidate(req.body,schema);
      if(!!error) return res.status(400).send({"error_message":error.details[0].message});
      // check for user existance
      let iscandidateExist = await Candidate.findOne({$or:[{email : req.body.email},{phone:req.body.phone}] });
      if(!!iscandidateExist) return res.status(409).send({"error_message":"candidate already exist"});

      //storing in DB
      let body = _.pick(req.body,['name','phone','email']);
      const candidate = new Candidate(body);
      try{
        let user = await candidate.save();
        res.status(200).send(user);
      }
      catch(err){
        res.status(400).send({err});
      }

})

Router.put('/:id',async (req, res)=>{
    let candidate = await Candidate.findOne({_id : req.params.id});
    if(!candidate) return res.status(400).send({"error_message":"Invalid Id"});

    let body = _.pick(req.body,["name","email","phone"]);

    const {error} = validateCandidate(body,schema);
    if(!!error) return res.status(400).send({"error_message":error.details[0].message});

    try{
     let updatedCandidate = await Candidate.findOneAndUpdate({_id :req.params.id},{name :body.name,phone:body.phone,email:body.email},{new:true}).select({password:0});
     res.status(201).send(updatedCandidate);
    }
    catch(ex){
        console.log(ex);
        res.status(409).send(ex)
    }
})



export default Router;