import express from 'express';
import _ from 'lodash';
import Recruiter,{validateRecruiter,postSchema,putSchema} from '../models/recruiters';
import {hashPassword} from '../utility/password';
import { createDecipher } from 'crypto';
import { resolve } from 'url';
const Router = express.Router();

Router.get('/',async (req, res)=>{
   try{
    let recruiters = await Recruiter.find().select({password : 0}).sort("name");
    res.status(200).send(recruiters);
   }
   catch(err){
    res.status(500).send(recruiters);
   }
})

Router.get('/:id',async (req, res)=>{
    try{
        let recruiter = await Recruiter.findOne({_id : req.params.id}).select({password:0});
        res.status(200).send(recruiter);
    }
    catch(err){
        res.status(400).send({error : "User doesn't exist"});
    }
})

Router.post('/',async(req, res)=>{
      // Validating request
      const {error} = validateRecruiter(req.body,postSchema);
      if(!!error) return res.status(400).send({"error_message":error.details[0].message});
      // check for user existance
      let isrecruiterExist = await Recruiter.findOne({email : req.body.email});
      if(!!isrecruiterExist) return res.status(409).send({"error_message":"user already exist"});

      //storing in DB
      const user = await hashPassword(req.body);
      const recruiter = new Recruiter(user);
      try{
        let user = await recruiter.save();
        let response = {
            _id : user._id,
            name : user.name,
            email : user.email,
            company: user.company,
            phone : user.phone
        }
        res.status(200).send(response);
      }
      catch(err){
        res.status(400).send({err});
      }

})

Router.put('/:id',async (req, res)=>{
    let recruiter = await Recruiter.findOne({_id : req.params.id});
    if(!recruiter) return res.status(400).send({"error_message":"Invalid Id"});

    let body = _.pick(req.body,["name","company","phone"]);

    const {error} = validateRecruiter(body,putSchema);
    if(!!error) return res.status(400).send({"error_message":error.details[0].message});

    try{
     let updatedRecruiter = await Recruiter.findOneAndUpdate({_id :req.params.id},{name :body.name,company:body.company,phone:body.phone},{new:true}).select({password:0});
     res.status(201).send(updatedRecruiter);
    }
    catch(ex){
        console.log(ex);
        res.status(409).send(ex)
    }
})

Router.delete('/:id', async (req, res)=>{  
    let recruiter = await Recruiter.findByIdAndRemove(req.params.id);
    if(!recruiter) return res.status(400).send({"error_message":"Invalid Id"});
    res.status(202).send(recruiter);
})

export default Router;