import  _ from 'lodash';
import Recruiter from '../models/recruiters';
import {comparepassword} from '../utility/password';
import {generateJwtToken} from '../utility/jwt';

const capitalize = (str = "") => str.toLowerCase();

export  const loginContoller = async(req,res)=>{
    
    let body = _.pick(req.body,['email','password']);
    try{
          let recruiter = await Recruiter.findOne({email: capitalize(body.email)});
          if(!recruiter)  return res.status(401).send("Invalid email or password");
          let isValid = await comparepassword(recruiter.password,body.password); 
          if(isValid){
                const payload = { id : recruiter._id,email:recruiter.email}
                let token = await generateJwtToken(payload);
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