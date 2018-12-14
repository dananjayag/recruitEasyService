import config from 'config';
import jwt from 'jsonwebtoken';
const jwtSecret = config.get("jwtsecret");

export function generateJwtToken(payload){
   return new Promise(async (resolve,reject)=>{
        try{
            const  token =  await jwt.sign(payload,jwtSecret,{ algorithm: 'RS256'});
            if(token){
                resolve(token);
            }
            else{
                reject(err);
            }
        }
        catch(err){
            reject(err);
        }
   })
    
}