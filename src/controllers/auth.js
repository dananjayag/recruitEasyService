import  _ from 'lodash';
import Recruiter from '../models/recruiters';
import {comparepassword} from '../utility/password' 
export  const loginContoller = async(req,res)=>{
    
    let body = _.pick(req.body,['email','password']);
    try{
          let recruiter = await Recruiter.findOne({email:body.email});
          if(!recruiter)  return res.status(401).send("Invalid email or password");
          let isValid = await comparepassword(recruiter.password,body.password); 
          if(isValid){
                let token = await recruiter.methods.generateToken();
                console.log(token,"token");
                res.status(200).send(token);
            }
          else{
            return res.status(401).send("Invalid email or password");
          }
         

    }
    catch(err){
        console.log(err)
        return res.status(401).send("Invalid email or password");
    }
}