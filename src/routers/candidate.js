import express from 'express';
import _ from 'lodash';
import Candidate,{validateCandidate,schema} from '../models/candidate';
import Interview from '../models/interview';
import {authMiddleware} from '../middlewares/auth';
const Router = express.Router();

Router.get('/', authMiddleware,async (req, res)=>{
   try{
        if(!!req.locals && !!req.locals.user && !req.query.interviewedBy)
        {
            let candidates = await Candidate.find({created_by : req.locals.user.id})
            res.status(200).send(candidates);
        }
        else{
            let candidates = await Interview.find({created_by : req.locals.user.id}).select("candidate").populate("candidate").exec();
            res.status(200).send(candidates);
        }
   }
   catch(err){
    res.status(500).send({err});
   }
})

Router.get('/:id',authMiddleware,async (req, res)=>{
    try{

        let candidate = await Candidate.findOne({_id : req.params.id})
        if(!candidate) return res.status(400).send({error : "Candidate doesn't exist"});
        res.status(200).send(candidate);
    }
    catch(err){
        res.status(400).send({error : "Invalid Id"});
    }
})

Router.post('/',authMiddleware,async(req, res)=>{
      // Validating request
      const {error} = validateCandidate(req.body,schema);
      if(!!error) return res.status(400).send({"error_message":error.details[0].message});
      // check for user existance
      let iscandidateExist = await Candidate.findOne({$or:[{email : req.body.email},{phone:req.body.phone}] });
      if(!!iscandidateExist) return res.status(409).send({"error_message":"candidate already exist"});

      //storing in DB
      let body = _.pick(req.body,['name','phone','email']);
      body.created_by = req.locals.user.id;
      const candidate = new Candidate(body);
      try{
        let user = await candidate.save();
        res.status(200).send(user);
      }
      catch(err){
        res.status(400).send({err});
      }

})

Router.put('/:id',authMiddleware,async (req, res)=>{
    let candidate = await Candidate.findOne({_id : req.params.id});
    if(!candidate) return res.status(400).send({"error_message":"Invalid Id"});

    let body = _.pick(req.body,["name","email","phone"]);

    const {error} = validateCandidate(body,schema);
    if(!!error) return res.status(400).send({"error_message":error.details[0].message});

    try{
     let updatedCandidate = await Candidate.findOneAndUpdate({$and :[{_id :req.params.id},{created_by : req.locals.user.id}]},{name :body.name,phone:body.phone,email:body.email},{new:true}).select({password:0});
     res.status(201).send(updatedCandidate);
    }
    catch(ex){
        console.log(ex);
        res.status(409).send(ex)
    }
})



export default Router;